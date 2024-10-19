// src/app/(blog)/aa/[...slug]/func.ts
import { JsonDocMetadataTreeNode } from "@/types/mdx";
import path from "path"
import fs from 'fs'
import {generateMetadataTree} from '@/lib/mdx/get/getsForFileSystem'

let blogsMetaTreeData: JsonDocMetadataTreeNode[];

if (process.env.NODE_ENV === 'production') {
  // 读取 metadata.json 文件
  const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
  const metadataFileContent = fs.readFileSync(metadataFilePath, 'utf8');
  blogsMetaTreeData = JSON.parse(metadataFileContent);
}
export function getFilesMetaTreeData(): JsonDocMetadataTreeNode[] {
  if (process.env.NODE_ENV === 'production') {
    return blogsMetaTreeData;
  } else {
    // 在开发环境中，每次请求时动态生成 metadataTree
    const postsDirectory = path.join(process.cwd(), 'src', 'app', '(blog)', 'md', 'blog');
    return generateMetadataTree(postsDirectory);
  }
}


export function getRelatedPosts(slug: string) {
  // 这里可以根据实际情况获取相关的文章数据
  console.log(`src/app/(blog)/aa/[...slug]/func.ts: slug: ${slug}`)
  return blogsMetaTreeData
}

export function getToc(slug: string) {
  // 这里可以根据实际情况获取文章的目录数据
  console.log(`src/app/(blog)/aa/[...slug]/func.ts: slug: ${slug}`)
  return [
    { id: 'section-1', title: 'Section 1' },
    { id: 'section-2', title: 'Section 2' },
  ];
}