// src/app/(blog)/aa/[slug]/_components/BlogToc.tsx
"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToc } from '@/context/TocContext';
import { Dialog, DialogContent, DialogOverlay, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MdTreeToc, MdTocTreeNode } from '@/types/mdx';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface BlogTocProps {
  toc: MdTreeToc;
}

export default function BlogToc({ toc }: BlogTocProps) {
  const { isTocOpen, toggleToc } = useToc();
  const [isMounted, setIsMounted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 初始化时检查窗口宽度
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsMounted(false);
    } else {
      setIsMounted(true);
    }
  }, [isMobile]);

  useEffect(() => {
    // 默认展开所有节点
    const expandAllNodes = (nodes: MdTocTreeNode[]) => {
      const newExpandedNodes = new Set<string>();
      const traverse = (nodes: MdTocTreeNode[]) => {
        nodes.forEach(node => {
          newExpandedNodes.add(node.anchor);
          if (node.children.length > 0) {
            traverse(node.children);
          }
        });
      };
      traverse(nodes);
      setExpandedNodes(newExpandedNodes);
    };

    expandAllNodes(toc);
  }, [toc]);

  if (!isTocOpen) {
    return null;
  }

  const toggleNode = (anchor: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(anchor)) {
        newSet.delete(anchor);
      } else {
        newSet.add(anchor);
      }
      return newSet;
    });
  };

  const filterToc = (nodes: MdTocTreeNode[], searchTerm: string): MdTocTreeNode[] => {
    return nodes
      .filter(node => node.text.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(node => ({
        ...node,
        children: filterToc(node.children, searchTerm),
      }));
  };

  const handleNavClick = () => {
    // console.log('handleNavClick');
    if (isMobile) {
      toggleToc();
    }
  };

  const renderToc = (nodes: MdTocTreeNode[], depth = 1) => (
    <ul>
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0;

        return (
          <li key={node.anchor}>
            <div
              className={`flex cursor-pointer items-center h-8 w-full hover:bg-gray-700 rounded-md transition-colors duration-200`}
              style={{ paddingLeft: `${(depth - 1) * 8}px` }}
            >
              {hasChildren ? (
                <button
                  className={`flex items-center justify-center w-4 h-full hover:text-purple-500 hover:bg-gray-500 ${depth === 1 ? 'rounded-l-md' : ''}`}
                  onClick={() => toggleNode(node.anchor)}
                >
                  {expandedNodes.has(node.anchor) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <span className='w-4 h-full' />
              )}
              <Link href={`#${node.anchor}`} className='flex items-center gap-2 p-1.5' style={{ width: 'calc(100% - 16px)' }} onClick={handleNavClick}>
                <span className='truncate flex-grow'>{node.text}</span>
              </Link>
            </div>
            {expandedNodes.has(node.anchor) && hasChildren && renderToc(node.children, depth + 1)}
          </li>
        );
      })}
    </ul>
  );

  const filteredToc = filterToc(toc, searchTerm);

  if (isMobile) {
    return (
      <Dialog open={isTocOpen} onOpenChange={() => toggleToc()}>
        <DialogContent overlayComponent={<DialogOverlay className="opacity-0" />} className="min-w-[296px] max-w-[calc(-64px+100dvw)] max-h-[calc(-64px+100dvw)] items-center backdrop-blur-md px-4 py-2 gap-0 glow-cyan-box-shadow ">
          <DialogHeader>
            <DialogTitle className='h-8 flex items-center'>Outline</DialogTitle>
          </DialogHeader>
          <span className='h-8 mt-2 flex'>
            <Input
              placeholder="Filter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-auto focus-visible:glow-purple-box-shadow px-2 bg-transparent"
            />
          </span>
          <nav className='pt-1 pb-2'>{renderToc(filteredToc)}</nav>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    isMounted && (
      <Card className="h-full max-h-[100vh] flex flex-col md:min-w-[320px] md:w-1/3 md:max-w-[460px] ml-4">
        <section className="mx-2 mt-2">
          <div className="flex justify-between">
            <h3>Outline</h3>
            <button></button>
          </div>
          <span className='h-8 mt-2 flex'>
            <Input
              placeholder="Filter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-auto focus-visible:glow-purple-box-shadow px-2 bg-transparent"
            />
          </span>
          <nav>{renderToc(filteredToc)}</nav>
        </section>
      </Card>
    )
  );
}