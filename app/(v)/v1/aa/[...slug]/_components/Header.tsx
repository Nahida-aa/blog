// src/app/(blog)/aa/[...slug]/_components/Header.tsx
"use client";
import { PanelLeftOpen, Slash } from 'lucide-react';
import { useSidebar } from './context/SidebarContext';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from 'react';

interface HeaderProps {
  url_path: string;
}

export default function Header({ url_path }: HeaderProps) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  // 将 url_path 拆分成多个部分
  const pathSegments = url_path.split('/');

  return (
    <header className="max-w-full flex items-center mx-4 mt-4">
      {!isSidebarOpen && (
        <Button variant="outline" size="icon" className='h-8 w-8' onClick={() => setSidebarOpen(true)}>
          <PanelLeftOpen size={16} />
        </Button>
      )}

      <Breadcrumb>
        <BreadcrumbList className='gap-1 sm:gap-1 px-1'>
          {pathSegments.map((segment, index) => {
            // 构建每个面包屑项的路径
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <Slash className='transform rotate-[-20deg]' size={16} />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  <BreadcrumbLink className='text-base font-semibold glow-purple' href={href}>
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}