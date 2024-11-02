// src/app/vscode/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import Script from 'next/script'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { blog_ContentMenuItems } from "../(blog)/_json/menu";
import AppHeader from "@/components/layout/header";

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script src="/vscode/Comet.js" strategy="lazyOnload" />
      <BackgroundProvider>
      <SidebarProvider >
        <AppSidebar menu_items={blog_ContentMenuItems} grouped={false} />
        {/* <Navbar /> */}
          <main className="flex flex-1 flex-col px-4 pb-4 w-full flex-grow overflow-hidden">
            <AppHeader />
            {children}
          </main>
        <BackgroundImage />
      </SidebarProvider>
      </BackgroundProvider>
    </>
  );
}