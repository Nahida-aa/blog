// // src/lib/mdx/toc/generateListToc.ts
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkToc from 'remark-toc';
// import { visit } from 'unist-util-visit';
// import { MdToc, MdTocListNodeLevel } from '@/types/mdx';

// export const generateToc = (markdownContent: string): MdToc => {
//   const toc: MdToc = [];

//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkToc, { heading: 'toc|table[ -]of[ -]contents?' });

//   const ast = processor.parse(markdownContent);

//   visit(ast, 'heading', (node: any) => {
//     const level = node.depth as MdTocListNodeLevel;
//     const text = node.children.map((child: any) => child.value).join('');
//     const anchor = text.toLowerCase().replace(/\s+/g, '-');
//     const htmlText = processor.stringify(node);

//     toc.push({ level, text, anchor, htmlText });
//   });

//   return toc;
// };



// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import { visit } from 'unist-util-visit';
// import { MdListTocNode } from '../mdx';

// const generateListToc = (markdownContent: string): MdListTocNode[] => {
//   const toc: MdListTocNode[] = [];

//   const processor = unified().use(remarkParse);
//   const ast = processor.parse(markdownContent);

//   visit(ast, 'heading', (node: any) => {
//     const level = node.depth;
//     const text = node.children.map((child: any) => child.value).join('');
//     const anchor = text.toLowerCase().replace(/\s+/g, '-');
//     const htmlText = processor.stringify(node);

//     toc.push({ level, text, anchor, htmlText });
//   });

//   return toc;
// };

// export { generateListToc };