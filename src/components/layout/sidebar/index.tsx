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

interface AppSidebarProps {
  menu_groups?: MenuGroup[]
  menu_items?: MenuItem[]
  grouped?: boolean
}
export const AppSidebar: React.FC<AppSidebarProps> = ({ menu_groups = [], menu_items = [], grouped = true }) => {
  // const [sidebarWidth, setSidebarWidth] = useState(232)
  // const [isResizing, setIsResizing] = useState(false)
  // const startResizing = useCallback((e: React.MouseEvent) => {
  //   console.log('startResizing')
  //   e.preventDefault()
  //   setIsResizing(true)
  // }, [])
  // const stopResizing = useCallback(() => {
  //   setIsResizing(false)
  // }, [])
  // const resize = useCallback((e: MouseEvent) => {
  //   if (isResizing) {
  //     const newWidth = e.clientX
  //     setSidebarWidth(newWidth < 128 ? 128 : newWidth > 960 ? 960 : newWidth)
  //   }
  // }, [isResizing])
  // React.useEffect(() => {
  //   window.addEventListener('mousemove', resize)
  //   window.addEventListener('mouseup', stopResizing)
  //   return () => {
  //     window.removeEventListener('mousemove', resize)
  //     window.removeEventListener('mouseup', stopResizing)
  //   }
  // }, [resize, stopResizing])


  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  // 如果没有传入 grouped 参数，则 自动根据 menu_groups 和 menu_items 判断是否分组
  // console.log(`AppSidebar: state=${state}, open=${open}, openMobile=${openMobile}, isMobile=${isMobile}, toggleSidebar=${toggleSidebar}, menu_groups=${JSON.stringify(menu_groups, null, 2)}, menu_items=${JSON.stringify(menu_items[0].items[0].items[2], null, 2)}, grouped=${grouped}`)
  const isGrouped = grouped !== undefined ? grouped : menu_groups.length > 0

  // 自动展开对应的节点，需要根据当前路径判断
  const pathname = usePathname()
  // 拿到 localStorage 中保存的展开节点
  // const [expandedNodes, setExpandedNodes] = useState<string[]>(() => {
  //   if (typeof window !== 'undefined') {
  //     const savedNodes = localStorage.getItem('tree-menu-expanded-nodes')
  //     // console.log(`expandedNodes 由于有window 所以返回 ${savedNodes}`)
  //     return savedNodes ? JSON.parse(savedNodes) : []
  //   }
  //   // console.log(`expandedNodes 由于没有window 所以返回 {}`)
  //   return []
  // })

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
    // style={{ 
    //   width: state === 'expanded' ? `${sidebarWidth}px` : undefined, 
    //   '--sidebar-width': state === 'expanded' ? `${sidebarWidth}px` : undefined 
    // } as React.CSSProperties}
    >
      <SidebarHeader />
      <SidebarContent className="side-cont gap-0">
        {isGrouped ? (
          menu_groups.map((group, groupIndex) => (
            <Collapsible defaultOpen className="group/collapsible" key={group.name || groupIndex}>
              <SidebarGroup key={group.name || groupIndex} className="side-group p-0 ">
                <div className="flex items-center justify-between w-full">
                  <SidebarGroupLabel asChild className="px-0 group-data-[collapsible=icon]:hidden buttonSideGroupLabel">
                    <CollapsibleTrigger className='gap-1'>
                      <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      {group.name}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>

                  <SidebarGroupAction title="Add Project" className='!static mr-1  sideGroupActionButton'>
                    <Plus />
                  </SidebarGroupAction>
                </div>
                <CollapsibleContent>
                  <SidebarGroupContent className="px-2">
                    <SidebarMenu className="gap-0">
                      {group.items.map((item, index) => (
                        <TreeMenuNode key={index} item={item} currentPath={pathname}  expandedPaths={expandedPaths}
                        togglePath={togglePath}
                        isClient={isClient}
                        />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))
        ) : (
          <SidebarMenu className="gap-0 px-2">
            {menu_items.map((item, index) => (
              <TreeMenuNode key={index} item={item} currentPath={pathname}                   expandedPaths={expandedPaths}
              togglePath={togglePath}
              isClient={isClient}
               />
            ))}
          </SidebarMenu>
        )}
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