// src/app/(blog)/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, MenuItem } from "@/components/layout/sidebar"
import AppHeader from "@/components/layout/header";
import { blog_ContentMenuItems } from "@/app/(blog)/_json/menu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { CSSProperties } from "react";
import path from "path"
import { getFileTree } from "@/lib/file/getTree"
import { usePathname } from 'next/navigation'
import { headers } from 'next/headers'


export default async  function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const pathname = usePathname()
  const headersList = await headers()
  console.log(`src/app/(blog)/layout.tsx: `)
  const headerEntries = []
  headersList.forEach((value, key) => {
    headerEntries.push(`${key}: ${value}`)
  })
  console.log('Headers:', headerEntries)
  console.log(headersList)
  const userAgent = headersList.get('user-agent')
  const pathname = headersList.get('x-invoke-path') || headersList.get('referer') || '/'
  console.log(pathname)
  console.log(pathname.replace('/aa', ''))

  const dir = path.join(process.cwd(), 'src/app/(blog)/md/blog') // 假设你的文件在 app/content 目录下
  const fileTree = getFileTree(dir,'/aa')
  console.log(`fileTree`)


  const blog_ContentMenuItems: MenuItem[] = [
    {name: "Blog", path: "/aa", type: "button",
      items: fileTree
    },
    {name: "Comments", path: "/comment/test", },
    {name: "Tags", path: "/tags", },
    {name: "Friends", path: "/friends", },
    {name: "VSCode", path: "/vscode", },
    {name: "MC", path: "/mc", },
    {name: "tools", path: "/tools", type: "button",
      items: [
        { name: "api", path: "/tools/api", },
        { name: "mdx", path: "/tools/mdx",  },
        { name: "decode", path: "/tools/decode" },
      ]
    },
  ]
  // console.log(`blog layout ${JSON.stringify(blog_ContentMenuItems[0].items[0].items[2], null, 2)}`)
  return (
  <BackgroundProvider>
    <SidebarProvider 
    >
        <AppSidebar menu_items={blog_ContentMenuItems} grouped={false} />
          <main className="flex flex-1 flex-col px-4 pb-4 w-full flex-grow overflow-hidden">
            <AppHeader />
            {children}
          </main>
    </SidebarProvider>
    <BackgroundImage />
  </BackgroundProvider>)
}