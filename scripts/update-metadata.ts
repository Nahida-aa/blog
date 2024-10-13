import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 获取命令行参数
const args = process.argv.slice(2);
const currentDate = args[0];
const changedFiles = args.slice(1);

// 从内容中提取第一个一级标题
const extractFirstHeading = (content: string): string | null => {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim();
    }
  }
  return null;
};

// 更新 MDX 文件中的元数据
const updateMetadata = (filePath: string, currentDate: string) => {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  // console.log(`File content of ${filePath}:\n${content}`);
  
  // 提取元数据部分
  const { data, content: fileContent } = matter(content);
  if (!data) {
    console.error(`No metadata found in ${filePath}`);
    return;
  }
  console.log(data);

  // 更新元数据
  data.updated_at = currentDate;
  if (!data.pushed_at) {
    data.pushed_at = currentDate;
  }

  // 如果 title 为空，从内容中提取第一个一级标题并设置为 title
  if (!data.title) {
    const firstHeading = extractFirstHeading(fileContent);
    if (firstHeading) {
      data.title = firstHeading;
    }
  }

  // 如果 title 为空，从内容中提取第一个一级标题并设置为 title
  if (!data.title) {
    const firstHeading = extractFirstHeading(fileContent);
    if (firstHeading) {
      data.title = firstHeading;
    }
  }

  // 将更新后的元数据转换回字符串
  const updatedContent = matter.stringify(fileContent, data);

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Metadata updated for ${filePath}`);
};

// 获取命令行参数并更新文件
changedFiles.forEach(file => {
  updateMetadata(file, currentDate);
});