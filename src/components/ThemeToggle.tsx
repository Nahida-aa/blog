"use client";
import { Sun, Moon, Monitor} from 'lucide-react';
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          // variant="outline" 
          // size="icon" 
          className="rounded-full p-2 focus:outline-none flex text-blue-50"
        >
          <Sun size={20} className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className=' min-w-0 w-full'>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun size={20} className="" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon size={20} className="" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor size={20} className="" />
        </DropdownMenuItem>        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}