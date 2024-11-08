// scripts/generateData.ts
import fs from 'fs'
import path, { format } from 'path'
import  generateTreeToc from '../src/lib/mdx/toc/generateTreeToc';
import { parseFrontmatter } from '../src/lib/mdx/parseMatter';
import { FileMetadata, FileTreeToc, JsonDocMetadataTreeNode, JsonDocTocTreeNode } from '../src/types/mdx';

const postsDirectory = path.join(process.cwd(), 'src','app');
const outputDirectory = path.join(process.cwd(), 'public', 'data');
const metadataFilePath = path.join(outputDirectory, 'metadata.json');
const tocFilePath = path.join(outputDirectory, 'toc.json');
const staticParamsFilePath = path.join(outputDirectory, 'staticParams.json');

const generateTreeData = (directory: string, basePath: string = ''): { metadataTree: JsonDocMetadataTreeNode[], tocTree: JsonDocTocTreeNode[], staticParams: { slug: string[] }[] } => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.reduce((acc: { metadataTree: JsonDocMetadataTreeNode[], tocTree: JsonDocTocTreeNode[], staticParams: { slug: string[] }[] }, entry) => {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const { metadataTree, tocTree, staticParams } = generateTreeData(fullPath, relativePath);
      acc.metadataTree.push({
        path: relativePath.replace(/\\/g, '/') + '/', // 目录以斜杠结尾
        metadata: {} as FileMetadata,
        children: metadataTree,
      });
      acc.tocTree.push({
        path: relativePath.replace(/\\/g, '/') + '/', // 目录以斜杠结尾
        toc: [] as FileTreeToc,
        children: tocTree,
      });
      acc.staticParams.push(...staticParams);
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      const format = entry.name.endsWith('.mdx') ? 'mdx' : 'md';
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { metadata, content } = parseFrontmatter(fileContent);
      const toc = generateTreeToc(content, format);

      acc.metadataTree.push({
        path: relativePath.replace(/\\/g, '/'),
        metadata,
        children: [],
      });
      acc.tocTree.push({
        path: relativePath.replace(/\\/g, '/'),
        toc,
        children: [],
      });
      acc.staticParams.push({
        // slug: relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '').split('/'),
        // slug: relativePath.replace(/\\/g, '/').replace(/\.(mdx|md)$/, '').split('/'),
        slug: relativePath.replace(/\\/g, '/').split('/')
      });
    }
    return acc;
  }, { metadataTree: [], tocTree: [], staticParams: [] });
};

const generatePostsData = () => {
  const { metadataTree, tocTree, staticParams } = generateTreeData(postsDirectory);

  // 确保目标目录存在
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // 写入压缩后的 JSON 文件
  fs.writeFileSync(metadataFilePath, JSON.stringify(metadataTree));
  fs.writeFileSync(tocFilePath, JSON.stringify(tocTree));
  fs.writeFileSync(staticParamsFilePath, JSON.stringify(staticParams));
};

generatePostsData();