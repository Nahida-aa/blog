// src/app/(blog)/aa/[slug]/layout.tsx
import { TocProvider } from '@/context/TocContext';
import { SidebarProvider } from './_components/context/SidebarContext';

export default function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    slug: string
  }
}) {
  return (
    <TocProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </TocProvider>
  );
}