// src/components/layout/Nav/NavEnd.tsx
import Link from 'next/link';
import { User } from 'lucide-react';
import Github from '@/components/svg/github';
import BgToggle from '@/components/BgToggle'; 
import ThemeToggle from '@/components/ThemeToggle';
// import DayNightToggle from '@/components/Day-night/v2'

export function NavEnd() {
  return (
    <div className="max-h-8 flex items-center space-x-2 pl-10 pr-1">
      {/* 超过 md 大小时显示 */}
      <div className="hidden md:flex items-center space-x-1 pl-10 pr-1">
        <BgToggle />
        <ThemeToggle />
        {/* <DayNightToggle size={1.5} /> */}
        <Link href="https://github.com/Nahida-aa" target="_blank" className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 m-1">
          <div className="rounded-full p-1">
            <Github size={24} />
          </div>
        </Link>
      </div>
      {/* 用户登录按钮 */}
      <Link href="/login" className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 m-1 ml-4">
        <User size={24} />
      </Link>
    </div>
  );
}