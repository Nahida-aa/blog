// src/lib/mdx/toc/convertListToTree.ts
// TODO: 可能暂时用不上(暂时直接生成 tree)
import { MdListTocNode, MdTocTreeNode } from '@/types/mdx';

const convertListToTree = (list: MdListTocNode[]): MdTocTreeNode[] => {
  const tree: MdTocTreeNode[] = [];
  const stack: MdTocTreeNode[] = [];

  list.forEach((item) => {
    const newNode: MdTocTreeNode = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(newNode);
    } else {
      stack[stack.length - 1].children.push(newNode);
    }

    stack.push(newNode);
  });

  return tree;
};

export { convertListToTree };