import fs from 'fs';
import path from 'path';

// 配置前置路径
const basePath = path.join(__dirname, '../src/md/blog'); // 修改为你的前置路径

// 获取当前日期时间字符串
const getCurrentDateTime = (): string => {
  return new Date().toISOString();
};

// 生成元数据
const generateMetadata = (title: string) => {
  const currentDateTime = getCurrentDateTime();
  return `---
title: "${title}"
created_at: "${currentDateTime}"
pushed_at: "${currentDateTime}"
updated_at: "${currentDateTime}"
authors:
  - name: "Your Name"
    github: "your-github"
    twitter: "your-twitter"
private: false
svg: ""
image: ""
tags: []
description: ""
draft: false
---
`;
};

// 创建新的 MDX 文件
const createMdxFile = (relativeFilePath: string, title?: string) => {
  const filePath = path.join(basePath, relativeFilePath);
  const ext = path.extname(filePath);
  if (ext !== '.md' && ext !== '.mdx') {
    console.error('文件扩展名必须是 .md 或 .mdx');
    process.exit(1);
  }

  const fileName = path.basename(filePath, ext);
  const metadataTitle = title || fileName;
  const metadata = generateMetadata(metadataTitle);
  const content = `${metadata}\n\n# ${metadataTitle}\n\n`;

  // 确保目录存在
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`MDX file created at ${filePath}`);
};

// 解析命令行参数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('用法: bun scripts/new-md.ts <path> [title] \nor pnpm new-md <path> [title]');
  process.exit(1);
}

const relativeFilePath = args[0];
const title = args[1];

createMdxFile(relativeFilePath, title);