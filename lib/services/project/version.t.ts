import { projectVersion, versionFile } from "@/lib/db/schema";
import { _versionFileInsertZ, versionInsertSchema } from "@/lib/db/service";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const versionFileCreateZ = _versionFileInsertZ
  .omit({
    downloads: true,
    uploadStatus: true,
    actualSize: true,
  })
  .extend({ id: z.uuid() });
export type VersionFileCreate = z.infer<typeof versionFileCreateZ>;
export const addVersionFileSchema = _versionFileInsertZ.omit({
  id: true,
  versionId: true,
  storageKey: true,
});
export type AddVersionFile = z.infer<typeof addVersionFileSchema>;
export const versionCreateZ = versionInsertSchema.omit({
  id: true,
  downloads: true,
  createdAt: true,
  status: true,
  publisherId: true,
});
export type VersionCreate = z.infer<typeof versionCreateZ>;
export const versionCreateWithFilesZ = versionCreateZ.extend({
  versionFiles: z.array(addVersionFileSchema),
});

export const fileOperationsSchema = z
  .object({
    // 新增文件
    add: z.array(addVersionFileSchema).optional(),
    // 删除文件（通过fileId）
    delete: z.array(z.string()).optional(),
    // 更新文件信息（不包括文件本身）
    update: z
      .array(
        z.object({
          id: z.string().openapi({ example: "file123" }),
          uploadStatus: z.enum(["pending", "uploaded", "failed"]).optional(),
        }),
      )
      .optional(),
  })
  .optional();
export type FileOperations = z.infer<typeof fileOperationsSchema>;

export const versionUpdateZ = createUpdateSchema(projectVersion).omit({
  id: true,
  projectId: true,
  downloads: true,
  createdAt: true,
});
export type VersionUpdate = z.infer<typeof versionUpdateZ>;

export const versionUpdateWithOperationsZ = createUpdateSchema(projectVersion)
  .omit({ id: true, projectId: true, downloads: true, createdAt: true })
  .extend({
    // 文件变更操作
    fileOperations: fileOperationsSchema,
  });

export const versionIdSchema = z.object({
  projectId: z.uuid(),
  id: z.uuid(),
});
