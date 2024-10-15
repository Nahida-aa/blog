// src/app/(blog)/aa/[...slug]/_components/Sidebar/SidebarFrame.tsx
"use client";
import React, { useRef, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';

const minWidth = 128;
const maxWidth = 741;

interface SidebarFrameProps {
  children: React.ReactNode;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export default function SidebarFrame({ children, sidebarWidth, setSidebarWidth, isDragging, setIsDragging }: SidebarFrameProps) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sidebarRef.current) return; // 添加空值检查
    setIsDragging(true);
    document.body.classList.add('cursor-col-resize');
    document.body.style.userSelect = 'none'; // 禁用文本选择
    const startX = e.clientX;
    const startWidth = sidebarRef.current.offsetWidth;

    const handleMouseMove = (e: MouseEvent) => {
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

  return (
    <aside className={`hidden lg:flex sticky top-0 h-[100vh] max-h-[100vh]  ${!isSidebarOpen ? '!hidden' : ''}`}>
      <div
        ref={sidebarRef}
        className='p-4'
        style={{ width: sidebarWidth }}
      >
        {children}
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