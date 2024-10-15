// src/api/blog/meta/tree/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { JsonDocMetadataTreeNode } from '@/types/mdx';

// 读取 metadata.json 文件
const metadataFilePath = path.join(process.cwd(), 'public', 'data', 'metadata.json');
const metadataFileContent = fs.readFileSync(metadataFilePath, 'utf8');
const treeData: JsonDocMetadataTreeNode[] = JSON.parse(metadataFileContent);

export async function GET() {
  return NextResponse.json(treeData);
}