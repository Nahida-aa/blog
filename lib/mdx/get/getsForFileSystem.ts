// src/lib/mdx/get/getsForFileSystem.ts
import {JsonDocMetadataTreeNode,FileMetadata} from '@/types/mdx'
import { parseFrontmatter } from '@/lib/mdx/parseMatter';
import fs from 'fs';
import path from 'path';

export const generateMetadataTree = (directory: string, basePath: string = ''): JsonDocMetadataTreeNode[] => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.reduce((acc: JsonDocMetadataTreeNode[], entry) => {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const children = generateMetadataTree(fullPath, relativePath);
      acc.push({
        path: relativePath.replace(/\\/g, '/') + '/', // 目录以斜杠结尾
        metadata: {} as FileMetadata,
        children,
      });
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { metadata } = parseFrontmatter(fileContent);

      acc.push({
        path: relativePath.replace(/\\/g, '/'),
        metadata,
        children: [],
      });
    }
    return acc;
  }, []);
};