// src/app/(blog)/aa/[...slug]/_components/Sidebar/index.tsx
"use client"
import { useState } from 'react'
import { JsonDocMetadataTreeNode } from '@/types/mdx'
import FileTree from './PostTree'
import SidebarFrame from './SidebarFrame'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, Search } from 'lucide-react'
import { useSidebar } from '../context/SidebarContext'
import { Input } from '@/components/ui/input'

export default function BlogSidebar({ filesMeta }: { filesMeta: JsonDocMetadataTreeNode[] }) {
  const { setSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <SidebarFrame>
      <div className="w-full flex items-center mb-4 px-4 pt-4">
        <Button variant="ghost" size="icon" className='h-8 w-8 z-5' onClick={() => setSidebarOpen(false)}>
          <PanelLeftClose size={16} />
        </Button>
        <h2 className='ml-2 font-semibold'>Files</h2>
      </div>
      {/* 搜索框，要求能搜索下面的li中的内容 */}
      <div className="mx-4 mb-3">
        <span className='px-3 flex items-center min-h-8 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300'>
          <Search size={16} className="mr-2 " />
          {/* 去掉 input 的样式 包括黑色的边框 包括鼠标输入时的边框 */}
          <Input
            type="text"
            placeholder="Go to file"
            className="  bg-inherit border-none dark:placeholder:text-slate-200 focus:outline-[0px] focus:outline-inherit  w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </span>
      </div>
      <nav className='px-4 overflow-y-auto !max-h-full'>
        <FileTree nodes={filesMeta} depth={1} searchTerm={searchTerm} />
      </nav>
    </SidebarFrame>
  );
}