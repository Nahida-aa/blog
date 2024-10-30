// src/components/layout/header/index.tsx
'use client'
import { useSidebar } from "@/components/ui/sidebar";
import HeaderStart from "./start"

export default function Header() {
  const { openMobile } = useSidebar()
  // 后续可以改成分左右
  return (<header className="flex items-center gap-2 h-12">
    {!openMobile && (<HeaderStart />)}
  </header>)
}