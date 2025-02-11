// src/app/(blog)/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/Nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar"
import type { MenuItem } from "@/components/layout/sidebar/tree/TreeMenuNode";
import AppHeader from "@/components/layout/header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { CSSProperties } from "react";
import path from "path"
import { getFileTree } from "@/lib/file/getTree"
import { headers } from 'next/headers'
import { ParticleBackground } from "@/components/3d/ParticleBackground";


export default async  function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const headersList = await headers()
  // console.log(`src/app/(blog)/layout.tsx: `)
  // const headerEntries = []
  // headersList.forEach((value, key) => {
  //   headerEntries.push(`${key}: ${value}`)
  // })

  const dirPath = process.env.NODE_ENV === 'development' ? 'src/app/(blog)' : 'app/(blog)'
  const dir = path.join(process.cwd(), dirPath) // 假设你的文件在 app/content 目录下
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
    {name: 'Demo', type: 'button', path: '/demo',
      items: [
        {name: 'Globe', type: 'link', path: '/demo/globe'},
        {name: 'demo2', type: 'link', path: '/demo/demo2'},
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
    <ParticleBackground />
  </BackgroundProvider>)
}