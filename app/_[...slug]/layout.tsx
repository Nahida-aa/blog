// src/app/(blog)/layout.tsx
// import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage from '@/components/bg/BackgroundImage'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar"
import type { MenuItem } from "@/components/layout/sidebar/tree/TreeMenuNode";
import AppHeader from "@/components/layout/header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { CSSProperties, ReactNode } from "react";
import path from "path"
import { getFileTree } from "@/lib/file/getTree"
import { headers } from 'next/headers'
import { constants } from "@/app/config/constants"

export interface LayoutProps {
  children: ReactNode
  params: Promise<{ slug: string[] }>
  // searchParams?: { [key: string]: string | undefined }
}
export default async function FileLayout({
  children,
  params,
  // searchParams
}: LayoutProps) {

  const fileTree = getFileTree(constants.APP_DIR, '/')
  console.log(`fileTree`)
  const menu_groups = [
    {
      name: '',
      items: fileTree
    },
  ]

  // console.log(`blog layout ${JSON.stringify(blog_ContentMenuItems[0].items[0].items[2], null, 2)}`)
  return (
    // <BackgroundProvider>
    <SidebarProvider
    >
      <AppSidebar menu_groups={menu_groups} />
      <main className="flex flex-1 flex-col px-4 pb-4 w-full flex-grow overflow-hidden bg-opacity-0">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
    // <BackgroundImage />
    // </BackgroundProvider>
  )
}