"use client"
// src/components/layout/Nav/index.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { NavStart } from './NavStart';
import { NavEnd } from './NavEnd';
// 自定义节流函数
function throttle(func, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      lastTime = now;
      func(...args);
    }
  };
}
export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false)
  const [height, setHeight] = useState('3rem')

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 100) // 每100毫秒触发一次

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavbarClass = useMemo(() => {
    let newHeight;
    let newOpacity;
    if (isHovered) {
      newHeight = '3rem'
    } else {
      // 根据滚动距离动态计算高度
      newHeight = `${3*Math.max(1 - scrollY / 100, 0)}rem`
      newOpacity = scrollY > 100 ? 'opacity-0' : '';
    }
    if (newHeight !== height) {
      setHeight(newHeight);
    }
    
    return `h-[var(--navbar-height)] ${newOpacity}`
  }, [scrollY, isHovered])

  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-height', height)
    const cssHeight = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height');
    console.log(`Current height: ${height}, CSS --navbar-height: ${cssHeight}`)
  }, [height])
  return (
    <>
      <nav
      // transition-all duration-300
        className={`bg-appHeader fixed z-20 w-full flex justify-between items-center px-4 py-2  h-[var(--navbar-height)]  ${getNavbarClass}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NavStart />
        <NavEnd />
      </nav>
      {/* nav-placeholder */}
      <div className="h-[var(--navbar-height)]"></div> 
    </>
  );
}