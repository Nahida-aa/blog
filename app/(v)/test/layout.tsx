// src/app/test/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import { TocProvider } from "@/context/TocContext";
import { SidebarExpandedNodesProvider } from "../v1/aa/[...slug]/_components/context/SidebarExpandedNodesContext";
import { SidebarProvider } from "../v1/aa/[...slug]/_components/context/SidebarContext";


export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <TocProvider>
    <SidebarProvider>
    <SidebarExpandedNodesProvider>
      <BackgroundProvider>
        <Navbar />
        {children}
        <BackgroundImage />
      </BackgroundProvider>
    </SidebarExpandedNodesProvider>
    </SidebarProvider>
    </TocProvider>
    </>
  );
}