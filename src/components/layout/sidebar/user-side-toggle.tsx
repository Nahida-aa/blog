import React, { useEffect, useState, type ComponentProps } from 'react';
import NextImage from 'next/image';
import { type SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { BetterTooltip } from '@/components/common/BetterTooltip';

import { SidebarLeftIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Copy } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Skeleton } from '@/components/ui/skeleton';


export type UserMeta = {
  id: string;
  email?: string;
  name: string;
  nickname?: string;
  image: string;
}
interface UserSidebarToggleProps {
  user?: UserMeta 
  className?: string;
  status?: string;
}
export function UserSidebarToggle({
  user,
  className,
  status = "offline", // 默认状态为 offline
}:  UserSidebarToggleProps
// ComponentProps<typeof SidebarTrigger>
) {
  const { toggleSidebar } = useSidebar();
  // 如果没有登录则 `https://avatar.vercel.sh/Guest`, 如果登录了 但是没有 image 但有 email 则显示 `https://avatar.vercel.sh/${user?.email}`, 如果没有 email 则显示 `https://avatar.vercel.sh/${user?.name}`
  const img_src = user?.image ?? `https://avatar.vercel.sh/Guest`
  // const img_src_d = `https://raw.githubusercontent.com/Nahida-aa/avatar/refs/heads/main/star-80-d.webp`

  const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    // return `https://example.com/${src}?w=${width}&q=${quality || 75}`
    return src
  } // next 15

  // const [imageLoaded, setImageLoaded] = useState(false);
  // const [cachedImage, setCachedImage] = useState<string | null>(null);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = img_src_d;
  //   img.onload = () => {
  //     setImageLoaded(true);
  //     setCachedImage(img_src_d);
  //   };
  // }, [img_src_d]);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
    {/* <BetterTooltip content="Toggle Sidebar" align="start"> */}
      <Button
        onClick={toggleSidebar}
        variant="ghost"
        className="p-1 md:h-fit relative size-10 rounded-full hover:bg-opacity "
      >
        <NextImage
          // loader={imageLoader}
          src={img_src}
          alt={user?.email ?? 'User Avatar'}
          width={32}
          height={32}
          className="rounded-full hover:glow-purple-box-shadow"
        />
          <span className={`absolute bottom-1 right-1 w-2 h-2  border-1 rounded-full 
            ${status === "online" ? 'bg-green-500' : 'bg-gray-500'}
            `}></span>
        {/* {status === "online" && (
        )} */}
      </Button>
    {/* </BetterTooltip> */}
    </HoverCardTrigger>
    <HoverCardContent className="w-60">
        <div className="flex flex-col">
          <Avatar className='size-20'>
            <AvatarImage src={img_src} className='size-20'/>
            <AvatarFallback>
              <Skeleton className="size-20 rounded-full" />
            </AvatarFallback>
          </Avatar>
          {/* {imageLoaded && cachedImage ? (
          <img
            src={img_src_d}
            alt={user?.name || 'User'}
            width={80}
            height={80}
            className="rounded-full"
          />
          ) : (
            <Skeleton className="size-20 rounded-full" />
          )} */}
          <div className="space-y-1">
            <span>
              <span className="text-lg font-semibold">{user?.name}</span>
              {/* 复制按钮 */}
              <Button variant='ghost' size="icon" className="p-0 m-0 size-5 ml-2">
                <Copy size={8} />
              </Button>
            </span>
            <p className="text-sm">
              {user?.email}
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
