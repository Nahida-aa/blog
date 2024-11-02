// src/components/layout/Nav/NavEnd.tsx
import Link from 'next/link';
import { User } from 'lucide-react';
import Github from '@/components/svg/github';
import BgToggle from '@/components/BgToggle'; 
import ThemeToggle from '@/components/ThemeToggle';
// import DayNightToggle from '@/components/Day-night/v2'

export default function NavEnd() {
  return (
    <div className="max-h-8 flex items-center space-x-2  ">
      {/* 超过 md 大小时显示 */}
      <div className="flex items-center space-x-1  ">
        <BgToggle />
        <ThemeToggle />
        {/* <DayNightToggle size={1.5} /> */}
      </div>  

    </div>
  );
}