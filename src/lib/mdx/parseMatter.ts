import matter from 'gray-matter';
import type {FileMetadata } from '@/types/mdx'

export function parseFrontmatter(fileContent: string) {
  // console.log(`parseFrontmatter: ${fileContent}`)
  const { data: metadata, content } = matter(fileContent);
  // console.log(`parseFrontmatter:matter: ${JSON.stringify(metadata, null, 2)}`)
  return { metadata: metadata as FileMetadata, content };
}

// 自己实现(更加轻量)
// import yaml from 'js-yaml'
// function parseFrontmatter(fileContent: string) {
//   const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
//   const match = frontmatterRegex.exec(fileContent)

//   const frontMatterBlock = match![1]

    // if (!match) {
    //   return { metadata: {} as Metadata, content: fileContent };
    // }
    // const frontMatterBlock = match[1];

//   // 这个只能 0深度 的 key:value , value is string or [string]
//   // const frontMatterLines = frontMatterBlock.trim().split('\n')
//   // const metadata: Partial<Metadata> = {}
//   // frontMatterLines.forEach((line) => {
//   //   const [key, ...valueArr] = line.split(': ')
//   //   let value = valueArr.join(': ').trim()
//   //   value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
//   //   metadata[key.trim() as keyof Metadata] = value
//   // })
//   // ----
//   const metadata = yaml.load(frontMatterBlock) as Metadata;

//   const content = fileContent.replace(frontmatterRegex, '').trim()
//   return { metadata: metadata as Metadata, content }
// }