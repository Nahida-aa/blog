// src/components/layout/header/index.tsx
'use client'
import { useSidebar } from "@/components/ui/sidebar";
import HeaderStart from "./start"
import HeaderEnd from "./end"


export default function Header() {
  const { openMobile } = useSidebar()
  // 后续可以改成分左右
  return (<header className="flex items-center  h-12 justify-between">
    {!openMobile && (<HeaderStart />)}
    <HeaderEnd />
  </header>)
}