// src/app/(blog)/layout.tsx
// 'use client'
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar"
import AppHeader from "@/components/layout/header";
import { blog_ContentMenuItems } from "./_json/menu";
import { CSSProperties } from "react";

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (<BackgroundProvider>
    <SidebarProvider 
      className=""
      style={{
        "--sidebar-width": "14.5rem",
        "--sidebar-width-mobile": "17.5rem",
      } as CSSProperties}
    >
      <AppSidebar menu_items={blog_ContentMenuItems} grouped={false} />
      {/* <Navbar /> */}
      {/* <SidebarInset className="flex-grow overflow-hidden"> */}
        <main className="flex flex-1 flex-col px-4 pb-4 w-full flex-grow overflow-hidden">
          <AppHeader />
          {children}
        </main>
      {/* </SidebarInset> */}
    </SidebarProvider>
    <BackgroundImage />
  </BackgroundProvider>)
}