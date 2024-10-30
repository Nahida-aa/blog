// src/app/(blog)/aa/[...slug]/_components/Sidebar/SidebarFrame.tsx
// 可调整宽度的侧边栏: 用户可以通过拖动侧边栏的边界来调整其宽度:使用 mousedown 事件开始拖动，mousemove 事件调整宽度，mouseup 事件结束拖动
// 宽度限制: 侧边栏的宽度被限制在 minWidth 和 maxWidth 之间, 当宽度小于 minWidth / 2 时，侧边栏会自动关闭,但不取消拖动状态 是为了用户回拖
// 拖动状态: 当鼠标进入边界时，鼠标样式会变成 col-resize，当拖动时，边界会变成紫色
"use client";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';

const minWidth = 128;
const maxWidth = 741;

interface SidebarFrameProps {
  children: React.ReactNode;
}

export default function SidebarFrame({ children }: SidebarFrameProps) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sidebarRef.current) return;
    console.log('DEBUG:mousemove');
    const newWidth = startWidthRef.current + (e.clientX - startXRef.current);
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
      console.log(`DEBUG: newWidth: ${newWidth}`);
    } else if (newWidth > minWidth / 2) {
      setSidebarOpen(true);
    } else if (newWidth <= minWidth / 2) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.classList.remove('cursor-col-resize');
    document.body.style.userSelect = ''; // 恢复文本选择
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sidebarRef.current) return; // 添加空值检查
    console.log('DEBUG:mousedown');
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = sidebarRef.current.offsetWidth;
    document.body.classList.add('cursor-col-resize');
    document.body.style.userSelect = 'none'; // 禁用文本选择
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [setIsDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <aside className={`hidden lg:flex sticky top-0 h-[100vh] max-h-[100vh] ${!isSidebarOpen ? '!hidden' : ''}`}>
      <div
        ref={sidebarRef}
        className='flex flex-col'
        style={{ width: 'var(--sidebar-width)' }}
      >
        {children}
      </div>
      {/* 与其他区域之间的边界 */}
      <div className="relative h-full w-[1px] bg-border">
        <div
          role="slider"
          aria-label="Draggable pane splitter"
          // aria-valuemin={minWidth}
          // aria-valuemax={maxWidth}
          tabIndex={0}
          className={`absolute inset-0 -inset-x-0.5 cursor-col-resize transition delay-100 ${isDragging ? 'bg-purple-500' : 'bg-transparent '}`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    </aside>
  );
}