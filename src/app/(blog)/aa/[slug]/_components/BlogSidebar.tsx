// src/app/(blog)/aa/[slug]/_components/BlogSidebar.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { PanelLeftClose } from 'lucide-react';
import { useSidebar } from './context/SidebarContext';
import { useToc } from '@/context/TocContext';
import { Button } from '@/components/ui/button';
import { PostTreeNode } from '@/types/mdx';
import PostTree from './Sidebar/PostTree';

const minWidth = 128;
const maxWidth = 741;

export default function BlogSidebar({ relatedPosts }: { relatedPosts: PostTreeNode[] }) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();
  const { isTocOpen } = useToc();
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1366 && isTocOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时调用一次

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isTocOpen, setSidebarOpen]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.classList.add('cursor-col-resize');
    document.body.style.userSelect = 'none'; // 禁用文本选择
    const startX = e.clientX;
    const startWidth = sidebarRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      } else if (newWidth > minWidth / 2) {
        setSidebarOpen(true);
      } else if (newWidth <= minWidth / 2) {
        setSidebarOpen(false);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.classList.remove('cursor-col-resize');
      document.body.style.userSelect = ''; // 恢复文本选择
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleNode = (slug: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <aside className={`hidden lg:flex sticky top-0 h-[100vh] max-h-[100vh] ${!isSidebarOpen ? '!hidden' : ''}`}>
      <div
        ref={sidebarRef}
        className='p-4'
        style={{ width: sidebarWidth }}
      >
        <div className="w-full flex items-center mb-4">
          <Button variant="ghost" size="icon" className='h-8 w-8 z-5' onClick={() => setSidebarOpen(false)}>
            <PanelLeftClose size={16} />
          </Button>
          <h2 className='ml-2 font-semibold'>Articles</h2>
        </div>

        {/* 搜索框，要求能搜索下面的li中的内容 */}

        <nav className='mr-4'>
          <PostTree nodes={relatedPosts} depth={1} expandedNodes={expandedNodes} toggleNode={toggleNode} />
        </nav>
      </div>
      {/* 与其他区域之间的边界 */}
      <div className="relative h-full w-[1px] bg-[#3d444d]">
        <div
          role="slider"
          aria-label="Draggable pane splitter"
          aria-valuemin={minWidth}
          aria-valuemax={maxWidth}
          aria-valuenow={sidebarWidth}
          aria-valuetext={`Pane width ${sidebarWidth} pixels`}
          tabIndex={0}
          className={`absolute inset-0 -inset-x-0.5 cursor-col-resize transition delay-100 ${isDragging ? 'bg-purple-500' : 'bg-transparent hover:bg-[var(--bgColor-neutral-muted,var(--color-neutral-muted,rgba(110,118,129,0.4)))]'}`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </aside>
  );
}