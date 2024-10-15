// src/components/layout/Nav/NavStart.tsx
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { Button } from '../../ui/button';
import { usePathname } from 'next/navigation';

const navItems = {
  '/': { name: 'home' },
  '/aa': { name: 'blog' },
  '/vscode': { name: 'vscode' },
  '/mc': {name:'mc'},
};

export function NavStart() {
  const pathname = usePathname();

  return (
    <div className='flex'>
      {/* 基础页面nav list, 仅在超过 md 时显示 */}
      <div className="hidden md:flex flex-row">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = path === '/' ? pathname === path : pathname.startsWith(path);
          return (
            <Link 
              key={path} 
              href={path} 
              className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative pr-2 m-1 ${isActive ? 'glow-purple' : ''}`}
            >
              {name}
            </Link>
          );
        })}
      </div>
      {/* 小于 md 时显示 AlignJustify 图标按钮 */}
      <div className="flex md:hidden">
        <Button variant="ghost" className='p-0 size-6'><AlignJustify size={24} /></Button>
      </div>
    </div>
  );
}