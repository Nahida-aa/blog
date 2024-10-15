// src/app/(blog)/aa/[...slug]/_components/Sidebar/PostTree.tsx
"use client"
import { ChevronRight, ChevronDown, BookMarked, BookCopy } from 'lucide-react'
import { JsonDocMetadataTreeNode } from '@/types/mdx';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react';
import { useSidebarExpandedNodes } from '../context/SidebarExpandedNodesContext';

interface PostNodeProps {
  nodes: JsonDocMetadataTreeNode[];
  depth: number;
}

const PostNode: React.FC<PostNodeProps> = ({ nodes, depth }) => {
  const { expandedNodes, toggleNode, setExpandedNodes } = useSidebarExpandedNodes();
  const currentPath = usePathname();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      console.log('src/app/(blog)/aa/[...slug]/_components/Sidebar/PostTree.tsx: initialRender')
      initialRender.current = false
      // 根据当前 URL 自动展开对应的目录及其父目录
      const pathSegments = currentPath.replace('/aa/', '').split('/'); // 去掉 '/aa/' 部分
      pathSegments.pop(); // 去掉最后一个文件部分
      const expanded: { [key: string]: boolean } = { ...expandedNodes }; // 保留之前的展开状态
      let currentPathSegment = ''
      pathSegments.forEach(segment => {
        currentPathSegment += segment + '/'
        expanded[currentPathSegment] = true
      });
      setExpandedNodes(expanded)
    }
  }, []); // 空依赖数组，确保只在初次渲染时运行

  // 对节点进行排序，将目录显示在最上面
  const sortedNodes = [...nodes].sort((a, b) => {
    if (a.path.endsWith('/') && !b.path.endsWith('/')) {
      return -1;
    }
    if (!a.path.endsWith('/') && b.path.endsWith('/')) {
      return 1;
    }
    return 0;
  });

  return (
    <ul>
      {sortedNodes.map((node) => {
        const isActive = currentPath === `/aa/${node.path.replace(/\.mdx?$/, '')}`;
        const isDirectory = node.path.endsWith('/');
        const displayName = node.path.split('/').filter(Boolean).pop()?.replace(/\.mdx$/, '') || node.path;

        // 如果是目录，链接导向对应目录下的 readme.mdx
        const linkPath = isDirectory
          ? `/aa/${node.path}readme`.replace(/\/\//g, '/')
          : `/aa/${node.path.replace(/\.mdx?$/, '')}`;

        return (
          <li key={node.path}>
            <div
              className={`flex cursor-pointer items-center h-8 w-full hover:bg-gray-700 rounded-md transition-colors duration-200 ${isActive ? 'bg-gray-600' : ''}`}
              style={{ paddingLeft: `${(depth - 1) * 8}px` }}
            >
              {isDirectory ? (
                <button
                  className={`flex items-center justify-center w-4 h-full hover:text-purple-500 hover:bg-gray-500 ${depth === 1 ? 'rounded-l-md' : ''}`}
                  onClick={() => toggleNode(node.path)}
                >
                  {expandedNodes[node.path] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <span className='w-4 h-full' />
              )}
              <Link href={linkPath} className='flex items-center gap-1.5' style={{ width: 'calc(100% - 16px)' }}>
                {node.metadata.svg ? (
                  <svg className='w-4 h-4 min-w-4' dangerouslySetInnerHTML={{ __html: node.metadata.svg }} />
                ) : isDirectory ? (
                  <BookCopy size={16} className='w-4 h-4 min-w-4' />
                ) : (
                  <BookMarked size={16} className='w-4 h-4 min-w-4' />
                )}
                <span className='truncate flex-grow'>{node.metadata.title || displayName}</span>
              </Link>
            </div>
            {expandedNodes[node.path] && isDirectory && (
              <PostNode nodes={node.children} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const PostTree: React.FC<{ nodes: JsonDocMetadataTreeNode[], depth: number }> = ({ nodes, depth }) => {
  return <PostNode nodes={nodes} depth={depth} />;
};

export default PostTree;