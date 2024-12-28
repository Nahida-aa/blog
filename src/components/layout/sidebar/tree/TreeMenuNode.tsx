"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { getIconByNameAndTypeAndStat } from "@/lib/map/icon"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

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
interface TreeMenuNodeProps {
  item: MenuItem
  depth?: number
  currentPath: string
  expandedPaths: Set<string>
  togglePath: (path: string) => void
  isClient: boolean
}

export const TreeMenuNode: React.FC<TreeMenuNodeProps> = ({
  item,
  depth = 0,
  currentPath,
  expandedPaths,
  togglePath,
  isClient
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.items && item.items.length > 0
  const isActive = currentPath === item.path

  useEffect(() => {
    if (isClient) {
      setIsOpen(expandedPaths.has(item.path))
    }
  }, [isClient, expandedPaths, item.path])


  const handleOpen = (isOpen: boolean) => {
    setIsOpen(isOpen)
    if (hasChildren) {
      togglePath(item.path)
    }
  }

  const MenuComp = depth === 0 ? SidebarMenu : SidebarMenuSub
  const MenuItemComp = depth === 0 ? SidebarMenuItem : SidebarMenuSubItem
  const MenuButtonComp = depth === 0 ? SidebarMenuButton : SidebarMenuSubButton

  const IconComponent = getIconByNameAndTypeAndStat(item.name, item.type, isOpen)
  const isLink = item.path && (item.type !== "dir" && item.type !== "button")

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpen}>
      <MenuItemComp className='MenuItemComp'>
        <CollapsibleTrigger asChild>
          <MenuButtonComp asChild className={`w-full ${isActive ? 'bg-accent text-accent-foreground' : ''} MenuButtonComp`}>
            {isLink ? (
              // Link 有特殊功能, TODO: 有待进一步研究
              <a href={item.path} className="flex items-center !px-1">
                {/* {item.icon && <item.icon />} */}
                <IconComponent className="" />
                <span className="truncate">{item.name}</span>
                {hasChildren && (
                  <ChevronRight className={`ml-auto mr-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                )}
                {!hasChildren && <div className="w-4 h-4" />}
              </a>
            ) : (
              <div className="flex items-center !px-1 cursor-pointer !gap-1.5">
                <IconComponent className="" />
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
                <TreeMenuNode key={index} item={subItem} depth={depth + 1} currentPath={currentPath} 
                expandedPaths={expandedPaths}
                togglePath={togglePath}
                isClient={isClient}
                />
              ))}
            </MenuComp>
          </CollapsibleContent>
        )}
      </MenuItemComp>
    </Collapsible>
  )
}