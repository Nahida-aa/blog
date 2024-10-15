import fs from 'fs';
import path from 'path';
import { JsonDocMetadataTree, MdTreeToc } from '@/types/mdx';
import { parseFrontmatter } from './parseMatter';

export const getMetadataTrees = (): JsonDocMetadataTree => {
  const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
  const metadataTree: JsonDocMetadataTree = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
  return metadataTree;
};

export const getBlog = (blog_path: string) => {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', '(blog)', 'md', 'blog');
  let filePath = path.join(postsDirectory, `${blog_path}.mdx`);
  let fileContent: string;

  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    // 如果读取 .mdx 文件失败，尝试读取 .md 文件
    filePath = path.join(postsDirectory, `${blog_path}.md`);
    fileContent = fs.readFileSync(filePath, 'utf8');
  }

  const { metadata, content: mdxContent } = parseFrontmatter(fileContent);
  return { metadata, mdxContent };
};

interface TocEntry {
  path: string;
  toc: MdTreeToc;
  children: TocEntry[];
}

export const getToc = (blog_path: string): MdTreeToc => {
  const tocFilePath = path.join(process.cwd(), 'public', 'data', 'toc.json');
  const tocData: TocEntry[] = JSON.parse(fs.readFileSync(tocFilePath, 'utf8'));

  const normalizePath = (p: string) => p.replace(/\\/g, '/').replace(/\.mdx?$/, '');

  const findToc = (entries: TocEntry[], fullPath: string): MdTreeToc | null => {
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
};