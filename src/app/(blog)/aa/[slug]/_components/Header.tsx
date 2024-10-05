// src/app/(blog)/aa/[slug]/_components/Header.tsx
"use client";
import { PanelLeftOpen } from 'lucide-react';
import { useSidebar } from './context/SidebarContext';
import { Button } from '@/components/ui/button';

export default function Header({ slug }) {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="flex items-center mx-4 mt-4">
      {!isSidebarOpen && (
        <Button variant="outline" size="icon" className='h-8 w-8' onClick={() => setSidebarOpen(true)}>
          <PanelLeftOpen size={16} />
        </Button>
      )}
      <p>md/{slug}.mdx</p>
    </header>
  );
}