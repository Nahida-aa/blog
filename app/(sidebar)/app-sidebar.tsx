"use client";

// import type { User } from 'next-auth';
import { useRouter, useSearchParams } from "next/navigation";

// import { PlusIcon } from '@/components/icons';
// import { SidebarHistory } from '@/components/sidebar-history';
// import { SidebarUserNav } from '@/components/layout/sidebar/sidebar-user-nav';
import { Button } from "@/components/ui/button";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
// import { BetterTooltip } from '@/components/common/BetterTooltip';
// import Link from 'next/link';
// import { Box, Check, ChevronDown, ChevronRight, FileIcon, FileUser, LogIn, MessageCircle, Milestone, PencilLine, QrCode, Settings, ShipWheel, Star, UserRound, X } from 'lucide-react';
// import { UserSidebarFooter } from './footer';
// import { ModeToggle } from '@/components/common/ModeToggle';

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import {Button as UIButton} from "@heroui/react";
import { SidebarContentMenuComponent } from "../../components/layout/sidebar/content/Menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ASidebarHeader } from "../../components/layout/sidebar/header";
import { ASidebarFooter } from "../../components/layout/sidebar/footer";
import { ASidebarContentHead } from "../../components/layout/sidebar/content-header";
import { ModeToggleGradientIcon } from "@/app/a/ui/base/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, FileClock, Gauge, Home, User2 } from "lucide-react";
import { Avatar } from "@/app/a/ui/base/image/avatar";
import { NoStyleLink } from "@/app/a/ui/base/html";
import { addSearchParams } from "@/lib/utils/url";

export function AppSidebar({ user }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setOpen, setOpenMobile, isMobile, toggleSidebar, open, openMobile, state } =
    useSidebar();
  // const displayUser = user || { email: 'guest@example.com', name: 'Guest' }
  // const img_src = user?.image ?? `https://avatar.vercel.sh/Guest`

  return (
    // group-data-[side=left]:border-r-0 backdrop-blur-md Sidebar
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ModeToggleGradientIcon size={28} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="[&>svg]:size-4.5">
                  <NoStyleLink
                    href={addSearchParams("/", searchParams)}
                    className="gap-2"
                  >
                    <Home size={18} />
                    <span>home</span>
                  </NoStyleLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NoStyleLink href={addSearchParams("/dashboard", searchParams)}>
                  <SidebarMenuButton className="[&>svg]:size-4.5">
                    <Gauge size={18} />
                    <span>dashboard</span>
                  </SidebarMenuButton>
                </NoStyleLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/log")}
                  className="[&>svg]:size-4.5"
                >
                  <FileClock size={18} />
                  <span>log</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard")}
                  className="[&>svg]:size-4.5"
                >
                  <Gauge size={18} />
                  <span>dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <ASidebarContentHead user={user} />
        <SidebarContentMenuComponent /> */}
      </SidebarContent>
      {/* <UserSidebarFooter user={user} status={user_status} /> */}
      <SidebarFooter>
        <SidebarMenuButton className="size-10 group-data-[collapsible=icon]:!size-10 !p-1 group-data-[collapsible=icon]:!p-1">
          <Avatar />
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
