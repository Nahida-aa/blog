// src/app/(blog)/aa/[slug]/_components/Sidebar/PostTree.tsx
"use client"
import { ChevronRight, ChevronDown, BookMarked } from 'lucide-react'
import { PostTreeNode } from '@/types/mdx';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
// import { Button } from '@/components/ui/button';

interface PostNodeProps {
  nodes: PostTreeNode[];
  depth: number;
  expandedNodes: { [key: string]: boolean };
  toggleNode: (slug: string) => void;
}

const PostNode: React.FC<PostNodeProps> = ({ nodes, depth, expandedNodes, toggleNode }) => {

  const currentPath = usePathname();

  return (
    <ul>
      {nodes.map((node) => {
        const isActive = currentPath === `/aa/${node.slug}`;
        const hasChildren = node.children.length > 0;

        return (
          <li key={node.slug}>
            <div
              className={`flex cursor-pointer items-center h-8 w-full hover:bg-gray-700 rounded-md transition-colors duration-200 ${isActive ? 'bg-gray-600' : ''}`}
              style={{ paddingLeft: `${(depth - 1) * 8}px` }}
            >
              {hasChildren ? (
                <button
                  className={`flex items-center justify-center w-4 h-full hover:text-purple-500 hover:bg-gray-500 ${depth === 1 ? 'rounded-l-md' : ''}`}
                  onClick={() => toggleNode(node.slug)}
                >
                  {expandedNodes[node.slug] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <span className='w-4 h-full' />
              )}
              {/* ?:flex-grow 不行但是 style={{ width: 'calc(100% - 16px)' }}可以 */}
              <Link href={`/aa/${node.slug}`} className='flex items-center gap-2 p-1.5' style={{ width: 'calc(100% - 16px)' }}>
                {node.metadata.svg ? (
                  <svg className='w-4 h-4 min-w-4' dangerouslySetInnerHTML={{ __html: node.metadata.svg }} />
                ) : <BookMarked size={16} className='w-4 h-4 min-w-4' />}
                <span className='truncate flex-grow'>{node.metadata.title}</span>
              </Link>
            </div>
            {expandedNodes[node.slug] && hasChildren && (
              <PostNode nodes={node.children} depth={depth + 1} expandedNodes={expandedNodes} toggleNode={toggleNode} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PostNode;