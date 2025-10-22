import { api } from "../../api/app/client";
import type { ErrRes } from "../../api/app/utils";
import { buildFileUrl } from "./utils";

export const getUploadUrls = async (
  files: { name: string; type: string; size: number }[],
  group?: string,
) => {
  const res = await api.upload.getSignedUrls.$post({
    json: { files, group },
  });
  if (!res.ok) {
    const error = (await res.json()) as unknown as ErrRes;
    throw new Error(error.message);
  }
  return await res.json();
};

export const uploadFile = async (signedUrl: string, file: File) => {
  const res = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      // 'Content-Length': file.size.toString(), // NOTE: 这里不需要设置 Content-Length，因为浏览器会忽视此头部,然后根据body自动计算并添加, https://github.com/Nahida-aa/Nahida-aa.github.io/blob/main/docs/web/http.md#request-header
    },
    body: file,
  });
  if (!res.ok) throw new Error("Failed to upload file");
};
export const uploadFileWithProgress = (
  signedUrl: string,
  file: File,
  onProgress?: (percent: number, loaded: number, total: number) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent, e.loaded, e.total);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed with status ${xhr.status}`));
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.onabort = () => reject(new Error("Upload aborted"));

    xhr.send(file);
  });
};

export const uploadSingleFile = async (file: File, group?: string) => {
  const signedUrls = await getUploadUrls(
    [{ name: file.name, type: file.type, size: file.size }],
    group,
  );
  await uploadFile(signedUrls[0].url, file);
  return buildFileUrl(signedUrls[0].storageKey);
};
