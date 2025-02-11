'use client';

// import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

// import { PlusIcon } from '@/components/icons';
// import { SidebarHistory } from '@/components/sidebar-history';
// import { SidebarUserNav } from '@/components/layout/sidebar/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar, 
} from '@/components/ui/sidebar';
// import { BetterTooltip } from '@/components/common/BetterTooltip';
// import Link from 'next/link';
// import { Box, Check, ChevronDown, ChevronRight, FileIcon, FileUser, LogIn, MessageCircle, Milestone, PencilLine, QrCode, Settings, ShipWheel, Star, UserRound, X } from 'lucide-react';
// import { UserSidebarFooter } from './footer';
// import { ModeToggle } from '@/components/common/ModeToggle';

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import {Button as UIButton} from "@heroui/react";
import { SidebarContentMenuComponent } from './content/Menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UserMeta } from '@/types/user';
import { ASidebarHeader } from './header';
import { ASidebarFooter } from './footer';
import { ASidebarContentHead } from './content-header';

export function AppSidebar({ user }: { user: UserMeta | undefined }) {
  // const router = useRouter();
  // const { setOpen, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  // const displayUser = user || { email: 'guest@example.com', name: 'Guest' }
  // const img_src = user?.image ?? `https://avatar.vercel.sh/Guest`

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 backdrop-blur-md Sidebar">
      <ASidebarHeader />
      <SidebarContent>
        <ASidebarContentHead user={user} />
        <section>
          <SidebarContentMenuComponent />
        </section>
      </SidebarContent>
      {/* <UserSidebarFooter user={user} status={user_status} /> */}
      <ASidebarFooter />
      {/* <SidebarRailSetWidth />- */}
    </Sidebar>
  );
}
