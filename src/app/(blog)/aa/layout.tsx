// src/app/(blog)/aa/layout.tsx
import { TocProvider } from '@/context/TocContext';
import { SidebarProvider } from './[...slug]/_components/context/SidebarContext';
import { SidebarExpandedNodesProvider } from './[...slug]/_components/context/SidebarExpandedNodesContext';
import { headers } from 'next/headers'


export default async function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  // headersList.entries()
  const contentType = headersList.get('content-type') // yes
  const host = headersList.get('host') // yes
  const url = headersList.get('url') // yes
  const userAgent = headersList.get('user-agent') // yes
  console.log(`src/app/(blog)/aa/layout.tsx userAgent: ${userAgent}`)
  console.log(`src/app/(blog)/aa/layout.tsx url: ${url}`)
  console.log(`src/app/(blog)/aa/layout.tsx headersList: ${headersList}`)
  // console.log(JSON.stringify(headersList.entries(), null, 2))
  // console.log(JSON.stringify(headersList.keys(), null, 2))
  return (
    <TocProvider>
      <SidebarProvider>
        <SidebarExpandedNodesProvider>
        {children}
        </SidebarExpandedNodesProvider>
      </SidebarProvider>
    </TocProvider>
  );
}