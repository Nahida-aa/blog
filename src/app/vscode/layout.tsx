// src/app/vscode/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import Script from 'next/script'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
// import { blog_ContentMenuItems } from "../(blog)/_json/menu"
import AppHeader from "@/components/layout/header"
import { getFileTree } from "@/lib/file/getTree";
import { constants } from "../config/constants";

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  const fileTree = getFileTree(constants.APP_DIR,'/')
  return (
    <>
      <Script src="/vscode/Comet.js" strategy="lazyOnload" />
      <BackgroundProvider>
      <SidebarProvider >
        <AppSidebar menu_items={fileTree} grouped={false} />
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