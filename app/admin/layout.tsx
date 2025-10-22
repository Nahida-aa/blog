'use client'

import { BackgroundProvider } from '@/context/BackgroundContext'
import { Navbar } from '@/components/layout/Nav'
import BackgroundImage from '@/components/bg/BackgroundImage'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"
import AppHeader from "@/components/layout/header";
// Menu Group and items.
import { admin_MenuGroups } from "@/app/admin/_mock/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <BackgroundProvider>
      <SidebarProvider>
        <AppSidebar menu_groups={admin_MenuGroups} />
        <main className="flex flex-1 flex-col px-4 pb-4 w-full flex-grow overflow-hidden">
            <AppHeader />
            {children}
          </main>
      </SidebarProvider>
      <BackgroundImage />
    </BackgroundProvider>
  )
}