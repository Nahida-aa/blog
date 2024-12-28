import fs from 'fs';
import path from 'path';
import { JsonDocMetadataTree, FileTreeToc } from '@/types/mdx';
import { parseFrontmatter } from './parseMatter';
import generateTreeToc from './toc/generateTreeToc';

export const getMetadataTrees = (): JsonDocMetadataTree => {
  const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
  const metadataTree: JsonDocMetadataTree = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
  return metadataTree;
}

export const getFile = (file_path: string) => {
  // console.log(`getFile: ${file_path}`)
  const postsDirectory = path.join(process.cwd(), 'src', 'app', '(blog)', 'blog');
  const filePath = path.join(postsDirectory, `${file_path}`)
  let rawContent = '';

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return { metadata: null, content: null };
  } 

  try {
    rawContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return { metadata: null, content: null };
  }

  const { metadata, content } = parseFrontmatter(rawContent);
  return { metadata, content,rawContent };
};

interface TocEntry {
  path: string;
  toc: FileTreeToc;
  children: TocEntry[];
}

import {constants} from '@/app/config/constants'
export const getToc_from_tocsJson = (blog_path: string): FileTreeToc => {
  const tocFilePath = path.join(process.cwd(), 'public', 'data', 'toc.json');
  const tocData: TocEntry[] = JSON.parse(fs.readFileSync(tocFilePath, 'utf8'));

  const normalizePath = (p: string) => p.replace(/\\/g, '/').replace(/\.mdx?$/, '');

  const findToc = (entries: TocEntry[], fullPath: string): FileTreeToc | null => {
    for (const entry of entries) {
      if (normalizePath(entry.path) === fullPath) {
        return entry.toc;
      }
      const toc = findToc(entry.children, fullPath);
      if (toc) {
        return toc;
      }
    }
    return null;
  };

  const normalizedPath = normalizePath(blog_path);
  return findToc(tocData, normalizedPath) || [];
}
export const getToc_from_md = (filePath: string): FileTreeToc => {
  const format = filePath.split('.').pop() as 'md' | 'mdx';
  const absFilePath = path.join(constants.APP_DIR, `${filePath}`)
  let fileContent = '';

  if (!fs.existsSync(absFilePath)) {
    console.error(`getToc_from_md:File not found: ${absFilePath}`);
    return []
  }

  try {
    fileContent = fs.readFileSync(absFilePath, 'utf8');
  } catch (err) {
    console.error(`getToc_from_md: Failed to read file: ${absFilePath}`, err);
    return [];
  }
  // console.log(`generateTreeToc-前`)
  const toc = generateTreeToc(fileContent,format);
  console.log(`generateTreeToc-后:${JSON.stringify(toc)}`)
  return toc;
};
export const getToc = getToc_from_md