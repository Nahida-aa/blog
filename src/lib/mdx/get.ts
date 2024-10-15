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
  const mdxFilePath = path.join(postsDirectory, `${blog_path}.mdx`);
  const mdFilePath = path.join(postsDirectory, `${blog_path}.md`);
  let filePath = '';
  let fileContent = '';

  if (fs.existsSync(mdxFilePath)) {
    filePath = mdxFilePath;
  } else if (fs.existsSync(mdFilePath)) {
    filePath = mdFilePath;
  } else {
    console.error(`File not found: ${mdxFilePath} or ${mdFilePath}`);
    return { metadata: null, mdxContent: null };
  }

  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return { metadata: null, mdxContent: null };
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