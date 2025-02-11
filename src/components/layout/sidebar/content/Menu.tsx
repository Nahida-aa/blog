import {Button as UIButton} from "@heroui/react";
import { useRouter } from "next/navigation";
import { BookMarked, Box, ChevronDown, ChevronRight, House, Link as LinkIcon, LogIn, PencilLine, QrCode, Settings, Star, UserRound, X } from 'lucide-react';
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
  useSidebar,
} from '@/components/ui/sidebar';

export const SidebarContentMenuComponent = () => {
  const router = useRouter();
  const menuItems = [
    { label: 'Docs', icon: BookMarked, path: '/docs',},
    { label: 'Friend link', icon: LinkIcon, path: '/friends',},
    { label: 'My home', icon: House, path: '/user/home',},
    {label: 'My friends',icon: UserRound,path: '/user/friend',},
    {label: 'My stars',icon: Star,path: '/',},
    {
      label: 'Mods',
      icon: Box,
      path: '/mods',
    },
  ];
  return (
    <SidebarMenu className='mx-3 w-auto gap-0 bg-muted rounded-md'>
      {menuItems.map((item, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton className='h-11 p-3 justify-between opacity-75 [&>svg]:size-5' asChild>
            <UIButton variant="light" onPressStart={() => { router.push(item.path) }}>
              <span className='flex items-center gap-2 text-base'>
                <item.icon className='size-5' /> {item.label}
              </span>
              <ChevronRight className='size-5' />
            </UIButton>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};