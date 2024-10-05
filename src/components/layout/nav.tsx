// src/components/layout/nav.tsx
import Link from 'next/link';
import BgToggle from '@/components/BgToggle'; 
import ThemeToggle from '@/components/ThemeToggle';
import { Github, User } from 'lucide-react';

const navItems = {
  '/': { name: 'home' },
  '/aa': { name: 'blog' },
  'https://vercel.com/templates/next.js/portfolio-starter-kit': { name: 'deploy' },
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
            <Link href="https://github.com" target="_blank" className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 m-1">
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