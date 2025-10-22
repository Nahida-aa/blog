import z from "zod";
import { sanitizeFilename } from "./utils";

type BaseProgress<Extra = Record<string, unknown>> = {
  file: File;
  loaded: number;
  percentage: number;
  addedAt: number; // 添加时间戳用于保持顺序
} & Extra;

export type _FileUploadProgress<Extra = Record<string, unknown>> =
  | (BaseProgress<Extra> & {
      status: "pending" | "uploading";
    })
  | (BaseProgress<Extra> & {
      status: "error";
      error: string;
    })
  | (BaseProgress<Extra> & {
      status: "success";
      result: {
        id: string;
        storageKey: string;
        url: string;
      };
    });

function handle(p: _FileUploadProgress) {
  if (p.status === "error") {
    console.log(p.error); // ✅ TS 知道一定存在
  }

  if (p.status === "success") {
    console.log(p.result.storageKey); // ✅ TS 知道一定存在
  }
}

export type _FileProgresses<Extra = Record<string, unknown>> = Record<
  string,
  _FileUploadProgress<Extra>
>; // key: file.name
export const _newFileUploadProgress = <Extra>(file: File): _FileUploadProgress<Extra> =>
  ({
    file,
    loaded: 0,
    percentage: 0,
    status: "pending",
    addedAt: Date.now(),
  }) as _FileUploadProgress<Extra>;
export const _newFileProgress = <Extra = Record<string, unknown>>(
  file: File,
): _FileProgresses<Extra> => ({
  [sanitizeFilename(file.name)]: _newFileUploadProgress(file),
});

// 生成预签名URL的请求 schema
export const genSignedUrlFile = z.object({
  name: z.string().min(1, "文件名不能为空").max(255, "文件名过长"),
  type: z.string().min(1, "文件类型不能为空"),
  size: z
    .number()
    .min(1, "文件大小必须大于0")
    .max(100 * 1024 * 1024, "文件大小不能超过100MB"), // 100MB限制
});
export const genSignedUrlJson = z.object({
  files: genSignedUrlFile.array().min(1, "至少需要一个文件"),
  group: z.string().optional(),
});
export type GenSignedUrlFile = z.infer<typeof genSignedUrlFile>;

export type GenSignedUrlJson = z.infer<typeof genSignedUrlJson>;
export const signedUrlRes = z.object({
  id: z.string(),
  name: z.string().meta({ example: "mod.jar" }),
  url: z.string().meta({ example: "https://r2.example.com/presigned-url" }),
  storageKey: z.string().meta({ example: "user/{authId}/{group}/{fileId}/{name}" }),
});
export type SignedUrl = z.infer<typeof signedUrlRes>;

export type FileShow = {
  id: string;
  name: string;
  url: string; // {s3PublicUrl}/{storageKey}
  type: string; // mime type
  size: number;
};
