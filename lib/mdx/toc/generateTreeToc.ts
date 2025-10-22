// // src/lib/mdx/toc/generatedTreeToc.ts
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkMdx from 'remark-mdx';
// import { visit } from 'unist-util-visit';
// import matter from 'gray-matter';
// import { FileTocTreeNode, FileTreeToc } from '@/types/mdx';
// import { Root, Heading, Text } from 'mdast';

// const generateTreeToc = (fileContent: string, format: 'md' | 'mdx'): FileTreeToc => {
//   const toc: FileTreeToc = [];
//   const stack: FileTocTreeNode[] = [];

//   // 使用 gray-matter 解析并移除前置数据
//   // console.log(`get content 前`);
//   const { content } = matter(fileContent);

//   // console.log(`get ast 前`);
//   const processor = unified().use(remarkParse);

//   if (format === 'mdx') {
//     processor.use(remarkMdx);
//   }

//   const ast = processor.parse(content) as Root;

//   visit(ast, 'heading', (node: Heading) => {
//     const level = node.depth;
//     const text = node.children
//       .filter((child): child is Text => child.type === 'text')
//       .map((child) => child.value)
//       .join('');
//     const anchor = text.toLowerCase().replace(/\s+/g, '-');

//     const newNode: FileTocTreeNode = { level, text, anchor, children: [] };

//     while (stack.length > 0 && stack[stack.length - 1].level >= level) {
//       stack.pop();
//     }

//     if (stack.length === 0) {
//       toc.push(newNode);
//     } else {
//       stack[stack.length - 1].children.push(newNode);
//     }

//     stack.push(newNode);
//   });

//   return toc;
// };

// export default generateTreeToc;