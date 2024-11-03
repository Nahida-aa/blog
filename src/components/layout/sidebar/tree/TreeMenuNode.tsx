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

  // useEffect(() => {
  //   if (currentPath.startsWith(item.path)) {
  //     setIsOpen(true)
  //     // console.log(`useEffect(,[currentPath, item.path])TreeMenuNode: currentPath=${currentPath}, item.path=${item.path}, isActive=${isActive}, isOpen=${isOpen}`)
  //     // 打印展开的 item.path
  //   }
  // }, [currentPath, item.path])
  // // console.log(`TreeMenuNode: currentPath=${currentPath}, item.path=${item.path}, isActive=${isActive}, isOpen=${isOpen}`)
  
  // // 在状态变化时保存展开状态到本地存储
  // useEffect(() => {
  //   if (!hasChildren) return // 忽略没有子节点的节点
  //   let newExpandedNodes = [...expandedNodes]
  //   // console.log(`TreeMenuNode:1 newExpandedNodes=${JSON.stringify(newExpandedNodes, null, 2)}`)
  //   if (isOpen) {
  //     if (!newExpandedNodes.includes(item.path || '')) {
  //       newExpandedNodes.push(item.path || '')
  //     }
  //   } else {
  //     newExpandedNodes = newExpandedNodes.filter(path => path !== item.path)
  //   }
  //   if (JSON.stringify(newExpandedNodes) !== JSON.stringify(expandedNodes)) {
  //     setExpandedNodes(newExpandedNodes)
  //     localStorage.setItem('tree-menu-expanded-nodes', JSON.stringify(newExpandedNodes))
  //     // console.log(`TreeMenuNode:2 newExpandedNodes=${JSON.stringify(newExpandedNodes, null, 2)}`)
  //   }
  // }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (hasChildren) {
      togglePath(item.path)
    }
  }
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