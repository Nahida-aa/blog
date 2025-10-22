import "dotenv/config";
import { s3PublicUrl } from "../../constants";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import assert from "node:assert";

// R2 配置
assert(process.env.R2_S3_ENDPOINT, "R2_S3_ENDPOINT 未设置");
assert(process.env.R2_ACCESS_KEY_ID, "R2_ACCESS_KEY_ID 未设置");
assert(process.env.R2_SECRET_ACCESS_KEY, "R2_SECRET_ACCESS_KEY 未设置");
assert(process.env.R2_BUCKET_NAME, "R2_BUCKET_NAME 未设置");
const R2_CONFIG = {
  region: "auto",
  endpoint: process.env.R2_S3_ENDPOINT, // https://账户id.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
};

const s3Client = new S3Client(R2_CONFIG);

/**
 * 生成R2预签名上传URL
 * @param storageKey 存储键名
 * @param mimeType 文件MIME类型
 * @param fileSize 文件大小（字节）
 * @param expiresIn 链接有效期（秒）
 * @returns 预签名上传URL
 */
export async function generatePresignedUploadUrl(
  storageKey: string,
  mimeType?: string,
  fileSize?: number,
  expiresIn: number = 3600, // 默认1小时
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: storageKey,
    ContentType: mimeType,
    ContentLength: fileSize,
    // 可以添加其他元数据 R2 貌似不支持 用 S3 的 metadata, 这不是必要功能,因此省略, 另外 R2 会自己记录创建时间
    // Metadata: {
    //   'upload-timestamp': Date.now().toString(),
    // },
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error("生成预签名URL失败:", error);
    throw new Error("生成上传链接失败");
  }
}

/**
 * 生成R2预签名下载URL
 * @param storageKey 存储键名
 * @param filename 自定义下载文件名
 * @param expiresIn 链接有效期（秒）
 * @returns 预签名下载URL
 */
export async function generatePresignedDownloadUrl(
  storageKey: string,
  filename?: string,
  expiresIn: number = 3600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: storageKey,
    // 自定义下载文件名
    ...(filename && {
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    }),
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });
    return signedUrl;
  } catch (error) {
    console.error("生成预签名下载URL失败:", error);
    throw new Error("生成下载链接失败");
  }
}

/**
 * 删除R2文件
 * @param storageKey 存储键名
 */
export async function deleteFile(storageKey: string): Promise<void> {
  const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: storageKey,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("删除文件失败:", error);
    throw new Error("删除文件失败");
  }
}

// 文件上传配置
export const UPLOAD_CONFIG = {
  // 允许的文件类型
  ALLOWED_MIME_TYPES: {
    // 项目文件
    mod: ["application/java-archive", "application/zip"],
    resource_pack: ["application/zip"],
    data_pack: ["application/zip"],
    shader: ["application/zip"],
    world: ["application/zip"],

    // 图片
    image: ["image/jpeg", "image/png", "image/gif", "image/webp"],

    // 文档
    document: ["text/markdown", "text/plain", "application/pdf"],
  },

  // 最大文件大小 (字节)
  MAX_FILE_SIZES: {
    mod: 100 * 1024 * 1024, // 100MB
    resource_pack: 500 * 1024 * 1024, // 500MB
    data_pack: 10 * 1024 * 1024, // 10MB
    shader: 50 * 1024 * 1024, // 50MB
    world: 1024 * 1024 * 1024, // 1GB
    image: 10 * 1024 * 1024, // 10MB
    document: 10 * 1024 * 1024, // 10MB
  },

  // 预签名URL有效期
  PRESIGNED_URL_EXPIRES: 3600, // 1小时
};
