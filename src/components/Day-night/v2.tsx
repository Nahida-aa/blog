"use client";
import React, { 
  // useCallback, 
  useEffect, useRef, useState } from 'react';
import './v2/css.css'; // 引入CSS文件
import { moveElementRandomly, handleMouseMove, handleMouseOut, toggleTheme } from './v2/func';
import { CloudSons, StarSons } from './v2/jsx';
import { useTheme } from "next-themes"
// import { motion, useAnimation } from 'framer-motion';
// TODO: 或许如下，我考完再来看看
// 由于 react 和 状态 hook 会导致组件重新渲染，所以我们需要使用 useRef 来保存状态，以确保在切换主题时有平滑的过渡效果。
const toggleThemeClass = (theme:'light' | 'dark') => {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    // 移除 light 类名，添加 dark 类名
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
};
// const getTheme = () => {
//   const theme = localStorage.getItem('theme');
//   if (theme) {
//     return theme;
//   }
//   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//   return mediaQuery.matches ? 'dark' : 'light';
// }


interface DayNightToggleProps {
  size?: number;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export default function DayNightToggle({ size = 3, onThemeChange }: DayNightToggleProps) {
  const { theme,
    // setTheme,
    systemTheme } = useTheme()
  console.log(theme)
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isMovedRef = useRef(isMoved);
  const isClickedRef = useRef(isClicked);
  // const debounceRef = useRef<NodeJS.Timeout | null>(null);
  // const controls = useAnimation();

  useEffect(() => {
    isMovedRef.current = isMoved;
  }, [isMoved]);

  useEffect(() => {
    isClickedRef.current = isClicked;
  }, [isClicked]);

  useEffect(() => {
    // console.log(`next-theme: ${theme}`);
    // console.log(`useEffect/ isMoved: ${isMoved}, isClicked: ${isClicked}`);
    const container = containerRef.current;
    if (!container) return;

    const $ = (s: string) => container.querySelectorAll(s);
    const mainButton = $('.main-button')[0] as HTMLElement;
    const daytimeBackground = $('.daytime-backgrond') as NodeListOf<HTMLElement>;
    const cloud = $('.cloud')[0] as HTMLElement;
    const cloudList = $('.cloud-son') as NodeListOf<HTMLElement>;
    const cloudLight = $('.cloud-light')[0] as HTMLElement;
    const components = $('.components')[0] as HTMLElement;
    const moon = $('.moon') as NodeListOf<HTMLElement>;
    const stars = $('.stars')[0] as HTMLElement;
    const star = $('.star') as NodeListOf<HTMLElement>;
    const handleToggleTheme = () => {
      // if (debounceRef.current) return; // 如果已经有一个定时器在运行，则不处理新的点击事件
      // debounceRef.current = setTimeout(() => {
      //   debounceRef.current = null; // 清除定时器引用
      // }, 500); // 设置防抖时间为500毫秒
      // console.log(`handleToggleTheme/isMoved: ${isMovedRef.current}`)
      // setTheme 的调用导致了组件的重新渲染，从而影响了动画效果。为了确保在切换主题时有平滑的过渡效果，我们需要使用 requestAnimationFrame 来确保在下一帧中执行 toggleTheme 函数。
      // setTimeout(() => {
      // requestAnimationFrame(() => {
        
      // }) // 延迟切换主题，以确保动画过渡效果
      // }, 500); // 延迟切换主题，以确保动画过渡效果
      
      toggleThemeClass(isMovedRef.current ? 'light': 'dark');
      requestAnimationFrame(() => {
        // setTheme(isMovedRef.current ? 'light': 'dark'); // 切换主题
        toggleTheme(isMovedRef.current, mainButton, daytimeBackground, cloud, cloudLight, components, moon, stars, onThemeChange);
        setIsClicked(true);
        setTimeout(() => {
          setIsClicked(false)
        }, 500);
        setIsMoved(!isMovedRef.current);
      });
      // toggleTheme(isMovedRef.current, mainButton, daytimeBackground, cloud, cloudLight, components, moon, stars, onThemeChange);
      // setIsClicked(true);
      // setTimeout(() => setIsClicked(false), 500);
      // setIsMoved(!isMovedRef.current);
      // setTheme(isMovedRef.current ? 'light' : 'dark'); // 切换主题
    };

    if ((theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && !isMoved) {
        handleToggleTheme()
    }else if((theme === 'light' || (theme === 'system' && systemTheme === 'light'))&& isMoved) {
        handleToggleTheme()
    } 
    console.log(`isMovedRef.current: ${isMovedRef.current}`)
    // controls.start({
    //   opacity: [0, 1],
    //   transition: { duration: 1 }
    // });

    components.onclick = handleToggleTheme;

    mainButton.addEventListener("mousemove", () => {
      if (!isClickedRef.current) {
        handleMouseMove(isClickedRef.current, isMovedRef.current, mainButton, daytimeBackground, star, cloudList);
      }
    });

    mainButton.addEventListener("mouseout", () => handleMouseOut(isClickedRef.current, isMovedRef.current, mainButton, daytimeBackground, star, cloudList));

    const cloudSons = container.querySelectorAll(".cloud-son");
    setInterval(() => {
      cloudSons.forEach(moveElementRandomly);
    }, 1000);

    // if (isMovedRef.current) {
    //   handleToggleTheme();
    // }
  }, []);

  return (
    <div ref={containerRef} className="container" style={{ fontSize: `${(size / 3).toFixed(2)}px` }} 
    // animate={controls}
    >
      <div className="components">
        <div className="main-button">
          <div className="moon"></div>
          <div className="moon"></div>
          <div className="moon"></div>
        </div>
        <div className="daytime-backgrond"></div>
        <div className="daytime-backgrond"></div>
        <div className="daytime-backgrond"></div>
        <div className="cloud">
          <CloudSons prefix="cloud" />
        </div>
        <div className="cloud-light">
          <CloudSons prefix="cloud-light" />
        </div>
        <div className="stars">
          {['big', 'big', 'medium', 'medium', 'small', 'small'].map((size, i) => (
            <StarSons key={i} size={size} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}