// src/app/(blog)/aa/[...slug]/_components/Sidebar/index.tsx
"use client";
import { useState } from 'react';
import { JsonDocMetadataTreeNode } from '@/types/mdx';
import PostTree from './PostTree';
import SidebarFrame from './SidebarFrame';
import { Button } from '@/components/ui/button';
import { PanelLeftClose } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

export default function BlogSidebar({ PostTrees }: { PostTrees: JsonDocMetadataTreeNode[] }) {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  const { setSidebarOpen } = useSidebar();

  return (
    <SidebarFrame
      sidebarWidth={sidebarWidth}
      setSidebarWidth={setSidebarWidth}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
    >
      <div className="w-full flex items-center mb-4">
        <Button variant="ghost" size="icon" className='h-8 w-8 z-5' onClick={() => setSidebarOpen(false)}>
          <PanelLeftClose size={16} />
        </Button>
        <h2 className='ml-2 font-semibold'>Articles</h2>
      </div>
      {/* 搜索框，要求能搜索下面的li中的内容 */}
      <nav className='mr-4'>
        <PostTree nodes={PostTrees} depth={1} />
      </nav>
    </SidebarFrame>
  );
}