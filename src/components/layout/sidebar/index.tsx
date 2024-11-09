"use client"
import { useCallback, useEffect, useState } from 'react'
import { Calendar, ChevronDown, ChevronsUpDown, ChevronUp, Home, Inbox, Search, Settings, User2, Link as FriendLink, MessageSquareText, BookMarked, Tags, ChartSpline, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import SidebarHeader from "@/components/layout/sidebar/header"
import SidebarFooter from "@/components/layout/sidebar/footer"
import React from "react"
import { usePathname } from 'next/navigation'

import { MenuGroup, MenuItem, TreeMenuNode } from './tree/TreeMenuNode'
import NavContent from './NavContent'
import FileTreeContent from './FileTreeContent'
import AdminNavContent from './content/Admin'

interface AppSidebarProps {
  menu_groups?: MenuGroup[]
  menu_items?: MenuItem[]
  grouped?: boolean
}
export const AppSidebar: React.FC<AppSidebarProps> = ({ menu_groups = [], menu_items, grouped }) => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  const isGrouped = grouped !== undefined ? grouped : menu_groups.length > 1
  console.log(`AppSidebar:isGrouped=${isGrouped}, menu_groups.length=${menu_groups.length}`)
  const [selectedContent, setSelectedContent] = useState('nav');
  const renderContent = () => {
    switch (selectedContent) {
      case 'nav':
        return <NavContent menu_groups={menu_groups} menu_items={menu_items} />;
      case 'fileTree':
        return <FileTreeContent menu_groups={menu_groups} menu_items={menu_items} />;
      case 'admin':
        return <AdminNavContent menu_groups={menu_groups} />;
      default:
        return <NavContent />
    }
  };

  // 自动展开对应的节点，需要根据当前路径判断
  const pathname = usePathname()

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    const savedPaths = localStorage.getItem('vscode-like-expanded-paths')
    if (savedPaths) {
      setExpandedPaths(new Set(JSON.parse(savedPaths)))
    }
  }, [])
  useEffect(() => {
    if (isClient && expandedPaths.size > 0) {
      localStorage.setItem('vscode-like-expanded-paths', JSON.stringify(Array.from(expandedPaths)))
    }
  }, [expandedPaths, isClient])
  const togglePath = (path: string) => {
    setExpandedPaths(prevPaths => {
      const newPaths = new Set(prevPaths)
      if (newPaths.has(path)) {
        newPaths.delete(path)
      } else {
        newPaths.add(path)
      }
      return newPaths
    })
  }
  console.log(`AppSidebar:传给 MenuItem 的 expandedPaths=${JSON.stringify(Array.from(expandedPaths), null, 2)}`)
  
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className='  md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:!hidden Sidebar '
    >
      <SidebarHeader 
      onSelect={setSelectedContent}
      />
      <SidebarContent className="side-cont gap-0">
        {renderContent()}
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
      {/* {!isMobile && state === 'expanded' && (
        <div
          style={{
            position: 'absolute',
            right: -2,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            background: 'transparent',
          }}
          onMouseDown={startResizing}
        />
      )} */}
    </Sidebar>
  )
}