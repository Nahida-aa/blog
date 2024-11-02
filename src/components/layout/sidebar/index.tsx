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
import { getIconByNameAndTypeAndStat } from '@/lib/map/icon'
import { usePathname } from 'next/navigation'

export type MenuItemType = "link" | "button" | "dir" | "file" | "repo"
export interface MenuItem {
  name: string
  // default=link. 链接, 按钮
  type?: MenuItemType
  path?: string // type=link
  onClick?: () => void // type=button
  // icon?: React.ElementType
  items?: MenuItem[]
}
export interface MenuGroup {
  name: string
  items: MenuItem[]
}
const TreeMenuNode: React.FC<{ item: MenuItem, depth?: number, currentPath: string, expandedNodes: string[], setExpandedNodes: (nodes: string[]) => void }> = ({ item, depth = 0, currentPath, expandedNodes, setExpandedNodes }) => {
  const [isOpen, setIsOpen] = useState(expandedNodes.includes(item.path || ''))
  const hasChildren = item.items && item.items.length > 0

  const isActive = currentPath === item.path

  
  
  useEffect(() => {
    if (currentPath.startsWith(item.path)) {
      setIsOpen(true)
      console.log(`useEffect(,[currentPath, item.path])TreeMenuNode: currentPath=${currentPath}, item.path=${item.path}, isActive=${isActive}, isOpen=${isOpen}`)
      // 打印展开的 item.path
    }
  }, [currentPath, item.path])
  console.log(`TreeMenuNode: currentPath=${currentPath}, item.path=${item.path}, isActive=${isActive}, isOpen=${isOpen}`)
  
  // 在状态变化时保存展开状态到本地存储
  useEffect(() => {
    if (!hasChildren) return // 忽略没有子节点的节点
    let newExpandedNodes = [...expandedNodes]
    console.log(`TreeMenuNode:1 newExpandedNodes=${JSON.stringify(newExpandedNodes, null, 2)}`)
    if (isOpen) {
      if (!newExpandedNodes.includes(item.path || '')) {
        newExpandedNodes.push(item.path || '')
      }
    } else {
      newExpandedNodes = newExpandedNodes.filter(path => path !== item.path)
    }
    if (JSON.stringify(newExpandedNodes) !== JSON.stringify(expandedNodes)) {
      setExpandedNodes(newExpandedNodes)
      localStorage.setItem('tree-menu-expanded-nodes', JSON.stringify(newExpandedNodes))
      console.log(`TreeMenuNode:2 newExpandedNodes=${JSON.stringify(newExpandedNodes, null, 2)}`)
    }
  }, [isOpen])

  const toggleOpen = () => setIsOpen(!isOpen)

  const MenuComp = depth === 0 ? SidebarMenu : SidebarMenuSub
  const MenuItemComp = depth === 0 ? SidebarMenuItem : SidebarMenuSubItem
  const MenuButtonComp = depth === 0 ? SidebarMenuButton : SidebarMenuSubButton

  const IconComponent = getIconByNameAndTypeAndStat(item.name, item.type, isOpen)
  const isLink = item.path && (item.type !== "dir" && item.type !== "button")

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <MenuItemComp className='MenuItemComp'>
        <CollapsibleTrigger asChild>
          <MenuButtonComp asChild className={`w-full ${isActive ? 'bg-accent text-accent-foreground' : ''} MenuButtonComp`}>
            {isLink ? (
              <Link href={item.path} className="flex items-center !px-1">
                {/* {item.icon && <item.icon />} */}
                <IconComponent />
                <span className="truncate">{item.name}</span>
                {hasChildren && (
                  <ChevronRight className={`ml-auto mr-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                )}
                {!hasChildren && <div className="w-4 h-4" />}
              </Link>
            ) : (
              <div className="flex items-center !px-1 cursor-pointer">
                <IconComponent />
                <span className="truncate">{item.name}</span>
                {hasChildren && (
                  <ChevronRight className={`ml-auto mr-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                )}
                {!hasChildren && <div className="w-4 h-4" />}
              </div>
            )}
          </MenuButtonComp>
        </CollapsibleTrigger>
        {hasChildren && (
          <CollapsibleContent>
            <MenuComp className="pr-0 ml-2.5 pl-1  mr-0 side-menu w-[100%-2.5rem]">
              {item.items!.map((subItem, index) => (
                <TreeMenuNode key={index} item={subItem} depth={depth + 1} currentPath={currentPath} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} />
              ))}
            </MenuComp>
          </CollapsibleContent>
        )}
      </MenuItemComp>
    </Collapsible>
  )
}

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
  const [expandedNodes, setExpandedNodes] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedNodes = localStorage.getItem('tree-menu-expanded-nodes')
      console.log(`expandedNodes 由于有window 所以返回 ${savedNodes}`)
      return savedNodes ? JSON.parse(savedNodes) : []
    }
    console.log(`expandedNodes 由于没有window 所以返回 {}`)
    return []
  })
  
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
                        <TreeMenuNode key={index} item={item} currentPath={pathname} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} />
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
              <TreeMenuNode key={index} item={item} currentPath={pathname} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} />
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