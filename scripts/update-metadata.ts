const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 获取命令行参数
const args = process.argv.slice(2);
const currentDate = args[0];
const changedFiles = args.slice(1);

// 更新 MDX 文件中的元数据
const updateMetadata = (filePath: string, currentDate: string) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 提取元数据部分
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    console.error(`No metadata found in ${filePath}`);
    return;
  }

  const metadata = yaml.load(match[1]) as Record<string, any>;
  console.log(metadata);

  // 更新元数据
  metadata.updated_at = currentDate;
  if (!metadata.pushed_at) {
    metadata.pushed_at = currentDate;
  }

  // 将更新后的元数据转换回 YAML
  const updatedMetadata = yaml.dump(metadata);

  // 替换原始内容中的元数据部分
  const updatedContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${updatedMetadata}---`);

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Metadata updated for ${filePath}`);
};

// 遍历已更改的 MDX 文件并更新元数据
changedFiles.forEach(file => {
  updateMetadata(file, currentDate);
});    