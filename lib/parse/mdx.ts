// // src/lib/parse/mdx.ts
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkMdx from 'remark-mdx';

// export function parseMDX(mdxContent) {
//   const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxContent);
//   const toc = [];

//   function visit(node, depth = 0) {
//     if (node.type === 'heading' && node.depth <= 3) {
//       toc.push({
//         id: node.children[0].value.toLowerCase().replace(/\s+/g, '-'),
//         title: node.children[0].value,
//         depth: node.depth,
//       });
//     }

//     if (node.children) {
//       node.children.forEach((child) => visit(child, depth + 1));
//     }
//   }

//   visit(tree);
//   return toc;
// }