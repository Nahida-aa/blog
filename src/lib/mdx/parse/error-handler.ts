// src/lib/mdx/parse/error-handler.ts
import { visit } from 'unist-util-visit'

export default function mdxErrorHandler() {
  return (tree) => {
    visit(tree, 'jsx', (node, index, parent) => {
      try {
        // 尝试解析 JSX 节点
        console.log('src/lib/mdx/parse/error-handler.ts: node.value:', node.value)
        new Function(node.value);
      } catch (error) {
        console.error('src/lib/mdx/parse/error-handler.ts: Error parsing JSX:', error)
        // 如果解析失败，将 JSX 节点转换为代码块
        parent.children[index] = {
          type: 'code',
          lang: 'jsx',
          value: node.value,
        };
      }
    });
  };
}