// src/lib/mdx/parse/error-handler.ts
// remark
import { visit, Visitor } from 'unist-util-visit'
import { Node } from 'unist' // pnpm install @types/unist

interface JSXNode extends Node {
  value: string;
}
interface CodeNode extends Node {
  type: 'code';
  lang: string;
  value: string;
}
export default function mdxErrorHandler() {
  return (tree: Node) => {
    const visitor: Visitor<JSXNode> = (node, index, parent) => {
      try {
        // 尝试解析 JSX 节点
        console.log('src/lib/mdx/parse/error-handler.ts: node.value:', node.value);
        new Function(node.value);
      } catch (error) {
        console.error('src/lib/mdx/parse/error-handler.ts: Error parsing JSX:', error);
        // 如果解析失败，将 JSX 节点转换为代码块
        if (parent && typeof index === 'number') {
          const codeNode: CodeNode = {
            type: 'code',
            lang: 'jsx',
            value: node.value,
          };
          parent.children[index] = codeNode;
        }
      }
    };

    visit(tree, 'jsx', visitor);
  };
}