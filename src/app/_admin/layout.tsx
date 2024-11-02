'use client'

import { BackgroundProvider } from '@/context/BackgroundContext'
import { Navbar } from '@/components/layout/Nav'
import BackgroundImage from '@/components/bg/BackgroundImage'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"
import { DynamicBreadcrumb } from '@/components/layout/DynamicBreadcrumb'
// Menu Group and items.
import { admin_MenuGroups } from "@/app/_admin/_mock/sidebar"

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
        <main className='p-4 w-full'>
          <header className="flex items-center mb-4">
            <SidebarTrigger />
            <DynamicBreadcrumb />
          </header>
          {children}
        </main>
      </SidebarProvider>
      <BackgroundImage />
    </BackgroundProvider>
  )
}