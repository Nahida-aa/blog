import type { AddVersionFile, VersionFileCreate } from "@/lib/services/project/version.t";
import { sanitizeFilename } from "@/lib/upload/utils";

// {name}_fabric_1.20.1-1.20.6.{ext}
export const genPrimaryFilename = (
  name: string,
  loaders: string[],
  gameVersions: string[],
): string => {
  // 生成主要文件名，包含加载器和游戏版本信息
  const loaderStr = loaders.join("-"); // 多个加载器用-连接
  const gameVersionRange =
    gameVersions.length > 1
      ? `${gameVersions[0]}-${gameVersions[gameVersions.length - 1]}`
      : gameVersions[0];
  // 解析文件名和扩展名
  const lastDotIndex = name.lastIndexOf(".");
  const nameWithoutExt = lastDotIndex > 0 ? name.substring(0, lastDotIndex) : name;
  const ext = lastDotIndex > 0 ? name.substring(lastDotIndex) : "";

  return `${nameWithoutExt}_${loaderStr}_${gameVersionRange}${ext}`;
};
// 准备 versionFile[]
export const mutPrepareVersionFiles = (
  files: AddVersionFile[],
  projectId: string,
  versionId: string,
) => {
  // 准备文件记录数据
  const basePath = `projects/${projectId}/versions/${versionId}/`;
  for (let i = 0; i < files.length; i++) {
    // const file = files[i];
    // 生成固定的存储key，使用文件ID作为唯一标识，避免后续重命名
    // 格式: projects/{projectId}/versions/{version_id}/{file_uuid}
    // 下载时通过 Content-Disposition 控制实际文件名
    const id = crypto.randomUUID(); // 生成文件唯一标识
    (files[i] as VersionFileCreate).id = id;
    (files[i] as VersionFileCreate).versionId = versionId;
    (files[i] as VersionFileCreate).storageKey = `${basePath}${sanitizeFilename(files[i].name)}`;
  }
  return files as VersionFileCreate[];
};
