// src/lib/mdx/toc/generatedTreeToc.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
import { MdTocTreeNode, MdTreeToc } from '@/types/mdx';
import { Root, Heading, Text } from 'mdast';

const generateTreeToc = (mdxContent: string): MdTreeToc => {
  const toc: MdTreeToc = [];
  const stack: MdTocTreeNode[] = [];

  const processor = unified().use(remarkParse).use(remarkMdx);
  const ast = processor.parse(mdxContent) as Root;

  visit(ast, 'heading', (node: Heading) => {
    const level = node.depth;
    const text = node.children
      .filter((child): child is Text => child.type === 'text')
      .map((child) => child.value)
      .join('');
    const anchor = text.toLowerCase().replace(/\s+/g, '-');
    // const htmlText = processor.stringify(node);

    const newNode: MdTocTreeNode = { level, text, anchor, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(newNode);
    } else {
      stack[stack.length - 1].children.push(newNode);
    }
  });

  return toc;
};

export default generateTreeToc;