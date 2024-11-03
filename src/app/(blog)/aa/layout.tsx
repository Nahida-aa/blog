// src/app/(blog)/aa/layout.tsx
import { TocProvider } from '@/context/TocContext';
import { SidebarProvider } from './[...slug]/_components/context/SidebarContext';
import { SidebarExpandedNodesProvider } from './[...slug]/_components/context/SidebarExpandedNodesContext';
import { headers } from 'next/headers'


export default async function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TocProvider>
      <SidebarProvider>
        <SidebarExpandedNodesProvider>
        {children}
        </SidebarExpandedNodesProvider>
      </SidebarProvider>
    </TocProvider>
  );
}