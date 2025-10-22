// src/app/(blog)/aa/[...slug]/layout.tsx
// import { TocProvider } from '@/context/TocContext';
import { SidebarExpandedNodesProvider } from './_components/context/SidebarExpandedNodesContext';
// import { SidebarProvider } from './_components/context/SidebarContext';

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarExpandedNodesProvider>
      {/* 这里写: 每次访问 对应页面时 layout 也会重新渲染, 因为页面是 layout + page */}
    {/* <TocProvider> */}
       {/* <SidebarProvider> */}
          {children}
       {/* </SidebarProvider> */}
     {/* </TocProvider> */}
    </SidebarExpandedNodesProvider>
  );
}