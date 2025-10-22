"use server";

import { db } from "@/lib/db";
import { checkMemberPermission } from "./member";
import { project, projectVersion, versionFile } from "@/lib/db/schema";

import { generatePresignedUploadUrl } from "../../upload/s3-storage";
import { eq, and, sql } from "drizzle-orm";
import { sanitizeFilename } from "../../upload/utils";
import type {
  AddVersionFile,
  VersionCreate,
  FileOperations,
  VersionFileCreate,
} from "./version.t";
import type { UpdateVersion } from "@/lib/db/service";
import { inferProjectType } from "../../utils/project/inferType";
import { mutPrepareVersionFiles } from "@/lib/services/project/version.tool";
import { AppErr } from "@/lib/types";

// C

// 生成 uploadUrl[]
export const generateUploadUrls = async (
  files: {
    id: string;
    name: string;
    type: string;
    size: number;
    storageKey: string;
  }[],
) => {
  // 为每个文件生成预签名上传URL
  return await Promise.all(
    files.map(async (file) => {
      const url = await generatePresignedUploadUrl(file.storageKey, file.type, file.size);
      return {
        id: file.id,
        name: file.name,
        url,
        storageKey: file.storageKey,
      };
    }),
  );
};
// createVersion
// 1. insert project_version, status.default = 'uploading'
// 2. 准备 versionFile[] 用于一次性插入
// 3. 一次性插入 versionFile[]
// 4. 生成 uploadUrl[]
export const createVersion = async (
  projectId: string,
  reqVersion: VersionCreate,
  versionFiles: AddVersionFile[],
  authId: string,
  type?: string,
) => {
  const hasPermission = await checkMemberPermission(projectId, authId, "version.admin");
  if (!hasPermission) throw AppErr("无权限操作此项目", 403);
  return await db.transaction(async (tx) => {
    // 1. insert project_version
    const newVersion = await tx
      .insert(projectVersion)
      .values({
        ...reqVersion,
        publisherId: authId,
      })
      .returning({ id: projectVersion.id });

    const versionId = newVersion[0].id;

    // 2. 准备 versionFile[]
    const fileRecords = mutPrepareVersionFiles(versionFiles, projectId, versionId);
    // 3. 一次性插入 versionFile[]
    await tx.insert(versionFile).values(fileRecords);
    // 4. 生成 uploadUrl[]
    const signedUrls = await generateUploadUrls(fileRecords);

    // 5. 可选, 修改项目类型
    if (type === "community") {
      const type = inferProjectType(fileRecords, reqVersion.loaders);
      await tx.update(project).set({ type }).where(eq(project.id, projectId));
    }

    return { versionId, signedUrls };
  });
};

export async function listVersionWithFiles(id: string) {
  return await db.query.projectVersion.findMany({
    where: eq(projectVersion.projectId, id),
    with: {
      versionFiles: true,
    },
  });
}

// U
export const updateVersion = async (
  projectId: string,
  versionId: string,
  versionUpdateData: UpdateVersion,
  fileOperations: FileOperations,
  authId: string,
) => {
  const hasPermission = await checkMemberPermission(projectId, authId, "version.write");
  if (!hasPermission) throw AppErr("无权限操作此项目", 403);

  return await db.transaction(async (tx) => {
    // 1. 更新版本基本信息
    if (Object.keys(versionUpdateData).length > 0) {
      await tx
        .update(projectVersion)
        .set(versionUpdateData)
        .where(eq(projectVersion.id, versionId));
    }

    // 2. 处理文件操作
    if (fileOperations) {
      // 2.1 删除文件
      if (fileOperations.delete && fileOperations.delete.length > 0) {
        // 验证文件是否属于此版本 (避免误删除其他版本的文件)
        const filesToDelete = await tx
          .select({
            id: versionFile.id,
            storageKey: versionFile.storageKey,
          })
          .from(versionFile)
          .where(
            and(
              eq(versionFile.versionId, versionId),
              // 使用 SQL 的 IN 操作符
              sql`${versionFile.id} = ANY(${fileOperations.delete})`,
            ),
          );

        if (filesToDelete.length > 0) {
          // 删除数据库记录
          await tx
            .delete(versionFile)
            .where(
              and(
                eq(versionFile.versionId, versionId),
                sql`${versionFile.id} = ANY(${fileOperations.delete})`,
              ),
            );

          // TODO: 删除存储文件（可以异步处理或加入删除队列）
          // for (const file of filesToDelete) {
          //   await deleteStorageFile(file.storageKey);
          // }
        }
      }

      // 2.2 更新文件信息
      if (fileOperations.update && fileOperations.update.length > 0) {
        for (const fileUpdate of fileOperations.update) {
          const { id, ...updateFields } = fileUpdate;

          // 验证文件是否属于此版本
          const existingFile = await tx
            .select({ id: versionFile.id })
            .from(versionFile)
            .where(and(eq(versionFile.id, id), eq(versionFile.versionId, versionId)))
            .limit(1);

          if (existingFile.length === 0) {
            throw new Error(`文件 ${id} 不存在或不属于此版本`);
          }
          await tx.update(versionFile).set(updateFields).where(eq(versionFile.id, id));
        }
      }

      // 2.3 新增文件
      if (fileOperations.add && fileOperations.add.length > 0) {
        const fileRecords = mutPrepareVersionFiles(
          fileOperations.add,
          projectId,
          versionId,
        );

        // 批量插入新文件记录
        await tx.insert(versionFile).values(fileRecords);

        // 4. 生成 uploadUrl[]
        return await generateUploadUrls(fileRecords);
      }
    }
  });
};
