"use client"
import { ChevronDown, Check, ChevronsUpDown,PanelLeft,Sparkles,X, FileText, File as FileIcon, Milestone, MessageCircle, FileUser, ShipWheel } from "lucide-react"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { TriggerCustomIcon } from "./custom/Trigger"
import { useRouter } from 'next/navigation'



import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

const side_head_selects = [
  {
    value: "nav",
    label: "Blog",
  },
  { value: 'fileTree', label: 'File Tree', icon: FileIcon },
  {
    value: "admin",
    label: "Admin",
  },
]

export function ComboboxSidebarHeader({ onSelect }: { onSelect: (value: string) => void }) {
  const [open, setOpen] =useState(false)
  const [selected, setSelected] = useState('nav');
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-0 justify-between group-data-[collapsible=icon]:!size-0 group-data-[collapsible=icon]:!p-0"
        >
          <span className="">{selected
            ? side_head_selects.find((side_head_select) => side_head_select.value === selected)?.label
            : ""}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 " />
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(var(--radix-popover-trigger-width)+2rem)] p-0  backdrop-blur-sm ">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No side_head_select found.</CommandEmpty>
            <CommandGroup>
              {side_head_selects.map((side_head_select) => (
                // <Link href={side_head_select.value} key={side_head_select.value}>
                <CommandItem
                  key={side_head_select.value}
                  value={side_head_select.value}
                  onSelect={(currentValue) => {
                    setSelected(currentValue === selected ? "" : currentValue)
                    onSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  
                  {side_head_select.label}
                  
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected === side_head_select.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
                // </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


export default function SidebarHeaderA({ onSelect }: { onSelect: (value: string) => void }) {
  const { isMobile } = useSidebar()
  const trigger_icon = isMobile ? <X /> : <PanelLeft />
  return (<SidebarHeader className="">

    <div className="flex items-center">
      <Link href={'/'} className="flex mr-2">
        <Sparkles size={32} />
      </Link>
      <div className="flex-1 mr-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <ComboboxSidebarHeader onSelect={onSelect} />
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      <div className="absolute group-data-[collapsible=icon]:-left-6 left-[calc(var(--sidebar-width)-theme(spacing.10))] group-data-[collapsible=icon]:opacity-0">
        <TriggerCustomIcon className="ml-auto size-8 p-2  " icon={trigger_icon} />
      </div>
    </div>
  </SidebarHeader>
  )
}



// function DropdownMenuDemo() {
//   return (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <SidebarMenuButton>
//         <span>More</span>
//         <ChevronsUpDown className="ml-auto" />
//       </SidebarMenuButton>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
//       <DropdownMenuItem>
//         <Link href={`/`}>Blog</Link>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
//         <Link href={`/admin`}>Admin</Link>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
//         <Link href={`https://stat.Nahida-aa.us.kg`}>Dashboard</Link>
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
//   )
// }

export const ASidebarHeader = () => {
  const { setOpen, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  const sideHeadSelects = [
    {value: "nav",label: "Navigate list",icon: Milestone},
    { value: 'chat', label: 'Chat list', icon: MessageCircle },
    {value: "me",label: "Profile",icon: FileUser,},
  ]
  const [selected, setSelected] = useState('nav');
  
  const router = useRouter();
  return <SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem className='flex'>
      <Button 
        // onClick={() => {router.push('/')}}
        className='w-9 h-9 min-w-9' variant="ghost" asChild>
        <Link href={"/"}>
          <ShipWheel size={20} /> 
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className='[&_svg]:size-5 h-9'>
            Select Workspace
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        {sideHeadSelects.map((sideHeadSelect) => (
          <DropdownMenuItem key={sideHeadSelect.value}
          >
            <SidebarMenuButton
              className="flex items-center gap-2"
              onClick={() => setSelected(sideHeadSelect.value)}
            >
              <sideHeadSelect.icon className="size-5" />
              <span>{sideHeadSelect.label}</span>
              <Check
                className={cn(
                  "ml-auto h-4 w-4",
                  selected === sideHeadSelect.value ? "opacity-100" : "opacity-0"
                )}
              />
            </SidebarMenuButton>
          </DropdownMenuItem>
        ))}
          <DropdownMenuItem>

            <span>
              Navigate list
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Chat list</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> 
      <Button
        variant="ghost"
        type="button"
        className="p-2 h-fit [&>svg]:size-5 [&_svg]:size-5"
        onClick={() => {
          toggleSidebar()
          // setOpen(false);
          // setOpenMobile(false);
          // router.push('/');
          // router.refresh();
        }}
      >
        <X />
      </Button>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>
}