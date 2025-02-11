"use client"

import * as React from "react"
import { Moon, MoonIcon, MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export const  ModeToggle = ({
  variant = "outline",
  className = "",
}:{ variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  className?: string | undefined
}) => {
  const { theme, setTheme } = useTheme()
  // const useThemeProps = useTheme()
  const onClick = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }

  return (<>
    <Button variant={variant} size="icon" className={cn(`inline-flex ${className}`)} onClick={onClick}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
</>)
}