'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts';

// import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/common/BetterTooltip';
import { PlusIcon, VercelIcon } from '@/components/icons';
import { useSidebar } from '@/components/ui/sidebar';
import { UserMeta, UserSidebarToggle } from '@/components/layout/sidebar/user-side-toggle';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Search, AlignRight, X, Sparkles, UserRound, House, UserRoundPlus, Box } from 'lucide-react';
// import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthSession } from '@/components/providers/auth-provider';

export const MoreMenu = () => {
  const router = useRouter();
  const currentPath = usePathname();
  console.log('currentPath:', currentPath)
  const menuItems = [
    // { path: '/', label: 'Home', icon: <House /> },
    // { path: '/user/friend', label: 'Friends', icon: <UserRound /> },
    { path: '/user/friend/add', label: 'Add Friend'
      , icon: <UserRoundPlus /> },
    { path: '/new/project', label: 'New project', icon: <Box /> },
  ];
  return (
    <ul className="flex flex-col gap-1 ">
      {menuItems.map((item) => (
        <li key={item.path}>
          <Button
            variant="ghost"
            className={`w-full justify-start `}
            onClick={() => {
              router.push(item.path);
            }}
          >
            {item.icon}
            <span className={`${currentPath === item.path ? 'glow-purple' : ''}`}>
            {item.label}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

interface HomeHeaderProps {
  user?: UserMeta;
  className?: string;
}

export function HomeHeader({ 
  // user, 
  className 
}: HomeHeaderProps
) {
  const router = useRouter();
  const { data: session } = useAuthSession();
  const user = session?.user;
  // const { open } = useSidebar();
  // const [more_open, set_more_open] = useState(false);
  // const [listMenu_open, set_listMenu_open] = useState(false);

  const { width: windowWidth } = useWindowSize();
  // const displayUser = user || { email: 'guest@example.com', name: 'Guest', image: null };
  // const user_status = "online" // online, offline, away, 未登录
  let user_status
  if (user) {
    user_status = "online"
  } else {
    user_status = "未登录"
  }
  return (<>
    <header className={`flex  backdrop-blur-md absolute w-full  px-2 py-1 items-center gap-2 justify-between top-0  ${className}`}>
      <div className='flex gap-1 items-center'>
        <UserSidebarToggle user={user} status={user_status} />
        {/* {windowWidth >= 768 && ( */}
        {/* <Button className='p-0 gap-0 flex-col justify-start' variant={'ghost'} onClick={() => {} }> */}
        <Button 
        className='flex pt-0 
        pb-[0.125rem]
        px-1 mt-[0.125rem] h-8 gap-0 flex-col items-start ' 
        variant={'ghost'} onClick={() => {
          router.push('/user/status')
        } }
        >
          <div className="text-[0.8rem] font-medium leading-[1.25rem]">{user?.nickname || user?.name || "Guest"}</div>
          <div className='text-xs text-gray-400 leading-3'>{user_status}</div>
        </Button>
        {/* )} */}
      </div>

      {/* <ModelSelector
        selectedModelId={selectedModelId}
        className="order-1 md:order-2"
      /> */}
      <div className='space-x-1'>
        {/* 搜索按钮: {翻译: Search} */}
        <Button variant="outline" className='px-2 min-w-10 bg-background/20'>
          <Search />
        </Button>
        <BetterTooltip content="Chat Bot">
          <Button variant="outline" className='px-2 min-w-10 bg-background/20'>
            <Sparkles />
          </Button>
        </BetterTooltip>  

        <ModeToggle className={`bg-background/20 hidden md:inline-flex`} />
        {/* {(windowWidth >= 768) && (
        )} */}

        {/* {(!open || windowWidth < 768) && ( */}
        {/* add 已被我改装为 more */}
        {/* {(windowWidth < 768) && ( */}
        <BetterTooltip content="More">
          <Popover>
            <PopoverTrigger asChild>          
              <Button
                variant="outline"
                className="bg-background/20 order-2 md:order-1 md:px-2 px-2 ml-auto md:ml-0  min-w-10"
                onClick={() => {
                }}
              >
                <PlusIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='min-w-0 w-auto p-0 '><MoreMenu /></PopoverContent>
          </Popover>
        </BetterTooltip>
        {/* )} */}

        {/* {(windowWidth < 768) && (
          <Button
            variant="outline"
            className="order-2 md:order-1 md:px-2 px-2 ml-auto md:ml-0  min-w-10"
            onClick={() => {
              set_listMenu_open(!listMenu_open)
            }}
          >
            {listMenu_open ? <X /> : <AlignRight />}
          </Button>
        )} */}
      </div>
    </header>
    {/* <div className='min-h-12'></div> */}
  </>
  );
}
