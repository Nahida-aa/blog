import { cookies } from 'next/headers';
import { AppSidebar } from '@/app/(sidebar)/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { server_auth } from '../(auth)/auth';
import { HomeHeader } from '@/components/layout/header/HomeHeader';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([server_auth(), cookies()]);
  console.log(`app/(main)/layout.tsx: Layout: session.user: ${JSON.stringify(session?.user)}`);
  console.log(`app/(main)/layout.tsx: Layout: cookieStore: ${JSON.stringify(cookieStore)}`)
  console.log(cookieStore)
  // https://ui.shadcn.com/docs/components/sidebar#persisted-state
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className=' '>
      {/* 模糊背景 */}
      <AppSidebar user={session?.user} />
      {/* <SidebarInset className='  '> */}
      {/* <HomeHeader user={session?.user} className='bg-card/80' /> */}
      {/* <div className='min-h-12'></div> */}
      <section>

        {children}
      </section>
      {/* </SidebarInset> */}
    </SidebarProvider>
  );
}
