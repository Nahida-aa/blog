// src/components/layout/nav.tsx
import Link from 'next/link';
import BgToggle from '@/components/BgToggle'; 
import ThemeToggle from '@/components/ThemeToggle';
import DayNightToggle from '@/components/Day-night/v2'
import { User } from 'lucide-react';
import  Github  from '@/components/svg/github';

const navItems = {
  '/': { name: 'home' },
  '/aa': { name: 'blog' },
  '/vscode': { name: 'vscode' },
};

export function Navbar() {
  return (
    <header className="bg-appHeader z-10">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-row items-start justify-between relative px-0 pb-0 fade md:overflow-auto scroll-p-6 md:relative" id="nav">
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link key={path} href={path} className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
                {name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-1 pl-10 pr-1">
            <BgToggle />
            <ThemeToggle />
            <DayNightToggle size={1.5} />
            <Link href="https://github.com/Nahida-aa" target="_blank" className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 m-1">
              <div className=" rounded-full p-1">
                <Github size={24} />
              </div>
            </Link>
            <Link href="/login" className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 m-1">
              <User size={24} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}