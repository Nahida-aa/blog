import { cookies } from 'next/headers';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { server_auth } from '../(auth)/auth';
import { HomeHeader } from '@/components/layout/header/HomeHeader';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([server_auth(), cookies()]);
  console.log(`app/(main)/layout.tsx: Layout: session.user: ${JSON.stringify(session?.user)}`);
  let user_status
  if (session?.user) {
    user_status = "online"
  } else {
    user_status = "未登录"
  }
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  // console.log(`app/(main)/layout.tsx: Layout: isCollapsed: ${isCollapsed}`);

  return (
    <SidebarProvider defaultOpen={!isCollapsed} className='min-h-screen SidebarProvider  '> 
    {/* 模糊背景 */}
      <ResizablePanelGroup
        direction="horizontal"
      >
        <ResizablePanel defaultSize={50}>
          
        <AppSidebar user={session?.user} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
        {/* <SidebarInset className='min-h-screen bg-opacity SidebarInset'> */}
          <HomeHeader user={session?.user} className='bg-card/80'  />
          <div className='min-h-12'></div>
          {children}
        {/* </SidebarInset> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
