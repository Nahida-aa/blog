"use server";

import { withAuth } from "@/lib/auth/server";
import { generatePresignedUploadUrl } from "@/lib/upload/s3-storage";
import type { GenSignedUrlJson } from "@/lib/upload/types";
import { sanitizeFilename } from "@/lib/upload/utils";

export async function _getSignedUrls(authId: string, data: GenSignedUrlJson) {
  const { files, group } = data;
  const basePath = group ? `user/${authId}/${group}` : `user/${authId}`;
  const signedUrls = await Promise.all(
    files.map(async (file) => {
      const id = crypto.randomUUID();
      const name = sanitizeFilename(file.name);
      const storageKey = `${basePath}/${id}/${name}`;
      const url = await generatePresignedUploadUrl(storageKey, file.type, file.size);
      return { id, name: file.name, storageKey, url };
    }),
  );
  return signedUrls;
}

export const getSignedUrls = withAuth(_getSignedUrls);
