import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { JsonDocMetadataTreeNode } from '@/types/mdx';

// 读取 metadata.json 文件
const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
const metadataFileContent = fs.readFileSync(metadataFilePath, 'utf8');
const treeData: JsonDocMetadataTreeNode[] = JSON.parse(metadataFileContent);

// 将树形结构转换为列表
function treeToList(tree: JsonDocMetadataTreeNode[]): JsonDocMetadataTreeNode[] {
  let list: JsonDocMetadataTreeNode[] = [];
  tree.forEach(node => {
    list.push(node);
    if (node.children && node.children.length > 0) {
      list = list.concat(treeToList(node.children));
    }
  });
  return list;
}

export async function GET() {
  const list = treeToList(treeData);
  return NextResponse.json(list);
}