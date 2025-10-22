import { visit, Visitor } from 'unist-util-visit';
import { Node, Literal } from 'unist';

interface TextNode extends Literal {
  type: 'text';
}

interface MarkNode extends Node {
  type: 'element';
  tagName: 'mark';
  children: TextNode[];
}

export default function remarkHighlight() {
  return (tree: Node) => {
    const visitor: Visitor<TextNode> = (node, index, parent) => {
      const value = node.value as string;
      const regex = /==([^=]+)==/g;
      let match;
      const matches = [];

      while ((match = regex.exec(value)) !== null) {
        matches.push(match);
      }

      if (matches.length > 0) {
        const newNodes: (TextNode | MarkNode)[] = [];
        let lastIndex = 0;

        matches.forEach((match) => {
          const [fullMatch, content] = match;
          const startIndex = match.index!;
          const endIndex = startIndex + fullMatch.length;

          if (startIndex > lastIndex) {
            newNodes.push({
              type: 'text',
              value: value.slice(lastIndex, startIndex),
            });
          }

          newNodes.push({
            type: 'element',
            tagName: 'mark',
            children: [{ type: 'text', value: content }],
          });

          lastIndex = endIndex;
        });

        if (lastIndex < value.length) {
          newNodes.push({
            type: 'text',
            value: value.slice(lastIndex),
          });
        }

        // 替换父节点中的当前节点
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1, ...newNodes);
        }

        // 调试信息：打印转换后的节点
        console.log('Converted nodes:', newNodes);
        // 调试信息：打印替换后的父节点
        console.log('Updated parent node:', JSON.stringify(parent, null, 2));
      }
    };

    visit(tree, 'text', visitor);
  };
}
export const remarkMark = remarkHighlight