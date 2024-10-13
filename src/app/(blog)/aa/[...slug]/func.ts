import { JsonDocMetadataTreeNode } from "@/types/mdx";
import path from "path";
import fs from 'fs';

// 读取 metadata.json 文件
const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
const metadataFileContent = fs.readFileSync(metadataFilePath, 'utf8');
const relatedPosts: JsonDocMetadataTreeNode[] = JSON.parse(metadataFileContent);

export function getRelatedPosts(slug: string) {
  // 这里可以根据实际情况获取相关的文章数据
  console.log(slug)
  return relatedPosts
}

export function getToc(slug: string) {
  // 这里可以根据实际情况获取文章的目录数据
  console.log(slug)
  return [
    { id: 'section-1', title: 'Section 1' },
    { id: 'section-2', title: 'Section 2' },
  ];
}