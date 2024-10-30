"use client"
import { useState } from 'react'
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

export interface MenuItem {
  name: string
  // default=link. 链接, 按钮, 悬停
  type?: "link" | "button" | "hover"
  url?: string // type=link
  icon?: React.ElementType
  items?: MenuItem[]
}

export interface MenuGroup {
  name: string
  items: MenuItem[]
}

const TreeMenuNode: React.FC<{ item: MenuItem, depth?: number }> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = item.items && item.items.length > 0

  const toggleOpen = () => setIsOpen(!isOpen)

  const MenuComp = depth === 0 ? SidebarMenu : SidebarMenuSub
  const MenuItemComp = depth === 0 ? SidebarMenuItem : SidebarMenuSubItem
  const MenuButtonComp = depth === 0 ? SidebarMenuButton : SidebarMenuSubButton

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <MenuItemComp>
        <CollapsibleTrigger asChild>
          <MenuButtonComp asChild className="w-full">
            <Link href={item.url || '#'} className="flex items-center !px-1">
              {item.icon && <item.icon  />}
              <span>{item.name}</span>
              {hasChildren && (
                <ChevronRight className={`ml-auto mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
              )}
              {!hasChildren && <div className="w-4 h-4" />}
            </Link>
          </MenuButtonComp>
        </CollapsibleTrigger>
        {hasChildren && (
          <CollapsibleContent>
            <MenuComp className="pr-0 ml-2.5 pl-1 mr-0 side-menu">
              {item.items!.map((subItem, index) => (
                <TreeMenuNode key={index} item={subItem} depth={depth + 1} />
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
  console.log(`AppSidebar: state=${state}, open=${open}, openMobile=${openMobile}, isMobile=${isMobile}, toggleSidebar=${toggleSidebar}`)
  const isGrouped = grouped !== undefined ? grouped : menu_groups.length > 0

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className='  md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:!hidden Sidebar'>
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
                        <TreeMenuNode key={index} item={item} />
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
              <TreeMenuNode key={index} item={item} />
            ))}
          </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}