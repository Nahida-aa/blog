// src/app/(blog)/aa/[slug]/_components/Header.tsx
"use client";
import { PanelLeftOpen, Slash } from 'lucide-react';
import { useSidebar } from './context/SidebarContext';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface HeaderProps {
  blog_path: string;
}
export default function Header({ blog_path }: HeaderProps) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="flex items-center mx-4 mt-4">
      {!isSidebarOpen && (
        <Button variant="outline" size="icon" className='h-8 w-8' onClick={() => setSidebarOpen(true)}>
          <PanelLeftOpen size={16} />
        </Button>
      )}

      <Breadcrumb>
        <BreadcrumbList className='gap-1 sm:gap-1'>
          <BreadcrumbItem>
            <BreadcrumbLink className='text-base font-semibold glow-purple' href="/aa"><h1>aa</h1></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className='transform rotate-[-20deg]' size={16} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className='glow-purple font-semibold ' href={`/aa/${blog_path}`}>{blog_path}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    </header>
  );
}