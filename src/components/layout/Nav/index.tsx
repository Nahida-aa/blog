"use client"
// src/components/layout/Nav/index.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { NavStart } from './NavStart';
import { NavEnd } from './NavEnd';

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const getNavbarClass = useMemo(() => {
    if (isHovered) {
      // return 'bg-transparent h-[var(--navbar-height)]';
      return ' h-12';
    } else if (scrollY > 100) {
      // return 'hidden';
      return 'opacity-0 h-0';
      // return '-translate-y-full';
    } else if (scrollY > 50) {
      return 'bg-opacity-70 h-8';
    } else {
      // return 'bg-transparent h-[var(--navbar-height)]';
      return 'h-12';
    }
  }, [scrollY, isHovered]);
  return (
    <>
      <nav
        className={`bg-appHeader fixed z-40 w-full flex justify-between items-center px-4 py-2 transition-all duration-300  ${getNavbarClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NavStart />
        <NavEnd />
      </nav>
      {/* nav-placeholder */}
      <div className="h-12"></div> 
    </>
  );
}