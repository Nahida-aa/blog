import { s3PublicUrl } from "../../constants";
import type { Accept } from "react-dropzone";

/**
 * Sanitize a filename for safe use in file systems, S3, or URLs.
 *
 * @param {string} name - The original filename.
 * @param {"strict"|"loose"|"urlSafe"} [mode="loose"] - Sanitization mode.
 *   - "strict": Only allows [a-zA-Z0-9._-]. Best for cross-platform safety.
 *   - "loose": Keeps Unicode (e.g. 中文, emoji), removes control chars, replaces
 *              URL reserved characters (? # % & +) with "_".
 *   - "urlSafe": Ensures RFC3986 URL-safe string, keeps [a-zA-Z0-9-._~],
 *                replaces all others with "_". Safe for direct URL usage.
 * @returns {string} A sanitized filename or URL-safe key.
 *
 * @example
 * sanitizeFilename("测试文件 100%.png", "loose");   // => "测试文件 100_.png"
 * sanitizeFilename("My Report?#.pdf", "strict");  // => "My_Report__.pdf"
 * sanitizeFilename("My 文件.png", "urlSafe");     // => "My_____.png"
 */
export function sanitizeFilename(
  name: string,
  mode: "strict" | "loose" | "urlSafe" = "loose",
): string {
  let result = name;

  if (mode === "strict") {
    result = result.replace(/[^a-zA-Z0-9._-]/g, "_");
  } else if (mode === "urlSafe") {
    result = result.replace(/[^a-zA-Z0-9._~-]/g, "_");
  } else {
    result = result
      .replace(/\p{C}/gu, "") // 删除控制字符
      .replace(/[\/:*?"<>|]/g, "_") // Windows 禁止的符号
      // .replace(/[?#%&+]/g, "_")    // 替换 URL 保留字符
      .replace(/#/g, "_"); // 避免 URL fragment 解析
  }

  // 去掉首尾空格或下划线
  result = result.trim().replace(/^_+|_+$/g, "");

  // Windows 保留字处理
  const reserved = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
  if (reserved.test(result)) {
    result = `_${result}`;
  }

  // 限制最大长度
  return result.substring(0, 255) || "untitled";
}

// interface Accept {
//   [key: string]: readonly string[];
// }
export const acceptFileFromProjectType = (projectType: string): Accept => {
  switch (projectType) {
    case "mod":
      return {
        "application/java-archive": [".jar"],
        "application/x-java-archive": [".jar"],
        "application/zip": [".zip", ".litemod"],
      };

    case "plugin":
      return {
        "application/java-archive": [".jar"],
        "application/x-java-archive": [".jar"],
        "application/zip": [".zip"],
      };

    case "resourcepack":
    case "shader":
    case "datapack":
      return {
        "application/zip": [".zip"],
      };

    case "modpack":
      return {
        "application/x-modrinth-modpack+zip": [".mrpack"],
        "application/zip": [".zip"],
      };

    default:
      return {
        "*": [], // 接受所有文件类型
      };
  }
};

export const imageAccept: Accept = {
  // JPEG 格式
  "image/jpeg": [".jpg", ".jpeg", ".jpe", ".jfif"],
  // PNG 格式
  "image/png": [".png"],
  // GIF 格式
  "image/gif": [".gif"],
  // WebP 格式
  "image/webp": [".webp"],
  // SVG 格式
  "image/svg+xml": [".svg"],
  // AVIF 格式
  "image/avif": [".avif"],
};

/**
 * 构建公共访问URL（如果文件是公开的）
 * @param storageKey 存储键名
 * @returns 公共访问URL
 */
export const buildFileUrl = (storageKey: string) =>
  `${s3PublicUrl}/${storageKey}`;
