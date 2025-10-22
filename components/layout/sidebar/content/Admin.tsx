// src/components/layout/sidebar/content/Admin.tsx
import React from 'react';
import { SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MenuGroup, TreeMenuNode } from '../tree/TreeMenuNode';
import { ChevronRight, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AdminNavContentProps {
  menu_groups: MenuGroup[];
}
const AdminNavContent: React.FC<AdminNavContentProps> = ({menu_groups}) => {
  const pathname = usePathname();
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(new Set());
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const savedPaths = localStorage.getItem('admin-expanded');
    if (savedPaths) {
      setExpandedPaths(new Set(JSON.parse(savedPaths)));
    }
  }, []);

  React.useEffect(() => {
    if (isClient && expandedPaths.size > 0) {
      localStorage.setItem('admin-expanded', JSON.stringify(Array.from(expandedPaths)));
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
  return (
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
  );
};

export default AdminNavContent;