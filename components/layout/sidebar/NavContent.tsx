// src/components/layout/sidebar/NavContent.tsx
import React from 'react'
import { SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuGroup, MenuItem, TreeMenuNode } from './tree/TreeMenuNode'
import { getFileTree } from '@/lib/file/getTree'
import { constants } from '@/app/config/constants'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight, Plus } from 'lucide-react'
// console.log(`src/components/layout/sidebar/NavContent.tsx${JSON.stringify(fs, null, 2)}`)

const menu_groups: MenuGroup[] = [
  {
    name: 'Navigation',
    items: [
      {
        name: 'Blog',
        type: 'link',
        path: '/blog',
        // items: getFileTree(constants.BLOG_DIR,'/aa')
      },
      {name: 'Tags',type: 'link',path: '/tags',},
      {name: 'Comment',type: 'link',path: '/comment/test',},
      { name: 'Friends',type: 'link', path: '/friends',},
      {name: 'VScode', type: 'link', path: '/vscode'},
      {name: 'Tools', type: 'button', path: '/tools',
        items: [
          {name: 'api', type: 'link', path: '/tools/api'},
          {name: 'mdx', type: 'link', path: '/tools/mdx'},
          {name: 'decode', type: 'link', path: '/tools/decode'},
        ]
      },
      {name: 'Demo', type: 'button', path: '/demo',
        items: [
          {name: 'Globe', type: 'link', path: '/demo/globe'},
          {name: 'demo2', type: 'link', path: '/demo/demo2'},
        ]
      },
    ]
  }
]
interface NavContentProps {
  menu_groups?: MenuGroup[]
  menu_items?: MenuItem[]
}
const NavContent: React.FC<NavContentProps> = ({ menu_groups,menu_items }) => {
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(new Set());
  const isGrouped = menu_groups?.length > 1
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const savedPaths = localStorage.getItem('nav-expanded');
    if (savedPaths) {
      setExpandedPaths(new Set(JSON.parse(savedPaths)));
    }
  }, []);

  React.useEffect(() => {
    // console.log('useEffect1:expandedPaths', expandedPaths)
    if (isClient ) {
      localStorage.setItem('nav-expanded', JSON.stringify(Array.from(expandedPaths)));
      // console.log('nav-expanded', expandedPaths)
    }
  }, [expandedPaths, isClient]);

  const togglePath = (path: string) => {
    setExpandedPaths(prevPaths => {
      const newPaths = new Set(prevPaths);
      if (newPaths.has(path)) {
        newPaths.delete(path);
      } else {
        newPaths.add(path);
      }
      return newPaths;
    });
  };
  const pathname = usePathname();
  return (<>
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
        {( menu_items? menu_items : menu_groups[0].items).map((item, index) => (
          <TreeMenuNode key={index} item={item} currentPath={pathname}                   expandedPaths={expandedPaths}
          togglePath={togglePath}
          isClient={isClient}
          />
        ))}
      </SidebarMenu>
    )}
  </>);
};

export default NavContent