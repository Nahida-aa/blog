// src/app/(blog)/aa/layout.tsx
// import { TocProvider } from '@/context/TocContext';
import { SidebarProvider } from './[...slug]/_components/context/SidebarContext';

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
      <SidebarProvider>
        {children}
      </SidebarProvider>
  );
}