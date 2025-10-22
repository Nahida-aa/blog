// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import '@/components/Day-night/css/index.css'; // 引入CSS文件

// interface DayNightProps {
//   initialTheme?: 'light' | 'dark';
//   size?: number;
// }

// const DayNight: React.FC<DayNightProps> = ({ initialTheme = 'dark', size = 3 }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

//   useEffect(() => {
//     const root = containerRef.current;
//     if (!root) return;

//     const func = (
//       root: HTMLElement, 
//       initTheme: 'light' | 'dark', 
//       changeTheme: (theme: 'light' | 'dark') => void) => {

//         const $ = (s: string) => {
//           let dom = root.querySelectorAll<HTMLElement>(s);
//           return dom.length === 1 ? dom[0] : dom;
//         };
//         let mainButton = $(".main-button") as HTMLElement;
//         let daytimeBackgrond = $(".daytime-backgrond") as NodeListOf<HTMLElement>;
//         let cloud = $(".cloud") as HTMLElement;
//         let cloudList = $(".cloud-son") as NodeListOf<HTMLElement>;
//         let cloudLight = $(".cloud-light") as HTMLElement;
//         let components = $(".components") as HTMLElement;
//         let moon = $(".moon") as NodeListOf<HTMLElement>;
//         let stars = $(".stars") as HTMLElement;
//         let star = $(".star") as NodeListOf<HTMLElement>;
//         let isMoved = false;
//         let isClicked = false;

//         window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
//           toggleThemeBasedOnSystem();
//         });

//         const toggleThemeBasedOnSystem = () => {
//           if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//             if (!isMoved) {
//               // 切换到暗主题
//               changeTheme('dark');
//             }
//           } else {
//             if (isMoved) {
//               // 切换到亮主题
//               changeTheme('light');
//             }
//           }
//         };

//         components.onclick = (ev) => {
//           if (isMoved) {
//             mainButton.style.transform = "translateX(0)";
//             mainButton.style.backgroundColor = "rgba(255, 195, 35,1)";
//             mainButton.style.boxShadow =
//               "3em 3em 5em rgba(0, 0, 0, 0.5), inset  -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset  4em 5em 2em -2em rgba(255, 230, 80,1)";
//             daytimeBackgrond[0].style.transform = "translateX(0)";
//             daytimeBackgrond[1].style.transform = "translateX(0)";
//             daytimeBackgrond[2].style.transform = "translateX(0)";
//             cloud.style.transform = "translateY(10em)";
//             cloudLight.style.transform = "translateY(10em)";
//             components.style.backgroundColor = "rgba(70, 133, 192,1)";
//             moon[0].style.opacity = "0";
//             moon[1].style.opacity = "0";
//           } else {
//             // 切换到暗主题的逻辑
//           }

//           isClicked = true;

//           setTimeout(function () {
//             // 延迟执行的逻辑
//           }, 500);
//           isMoved = !isMoved;
//         };

//         mainButton.addEventListener("mousemove", function () {
//           if (isClicked) {
//             if (isMoved) {
//               // 鼠标移动时的逻辑（暗主题）
//             } else {
//               // 鼠标移动时的逻辑（亮主题）
//             }
//           }
//         });

//         mainButton.addEventListener("mouseout", function () {
//           if (isClicked) {
//             // 鼠标移出时的逻辑
//           }
//           if (isMoved) {
//             // 鼠标移出时的逻辑（暗主题）
//           } else {
//             // 鼠标移出时的逻辑（亮主题）
//           }
//         });

//         const getRandomDirection = () => {
//           const directions = ["2em", "-2em"];
//           return directions[Math.floor(Math.random() * directions.length)];
//         };

//         const moveElementRandomly = (element: HTMLElement) => {
//           const randomDirectionX = getRandomDirection();
//           const randomDirectionY = getRandomDirection();
//           element.style.transform = `translate(${randomDirectionX}, ${randomDirectionY})`;
//         };

//         const cloudSons = root.querySelectorAll(".cloud-son");
//         setInterval(() => {
//           cloudSons.forEach(moveElementRandomly);
//         }, 1000);

//         if (initTheme === "dark") {
//           components.dispatchEvent(new MouseEvent('click')); // 模拟点击事件
//         }
//       };

//       const changeTheme = (newTheme: 'light' | 'dark') => {
//         setTheme(newTheme);
//         const event = new CustomEvent('change', { detail: newTheme });
//         containerRef.current?.dispatchEvent(event);
//       };

//     func(root, initialTheme, changeTheme);
//   }, [initialTheme]);

//   useEffect(() => {
//     const handleThemeChange = (e: CustomEvent) => {
//       if (e.detail === 'dark') {
//         document.body.style.backgroundColor = "#424242";
//       } else {
//         document.body.style.backgroundColor = "aliceblue";
//       }
//     };

//     containerRef.current?.addEventListener('change', handleThemeChange as EventListener);

//     return () => {
//       containerRef.current?.removeEventListener('change', handleThemeChange as EventListener);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="container" style={{ fontSize: `${(size / 3).toFixed(2)}px` }}>
//       <div className="components">
//         <div className="main-button">
//           <div className="moon"></div>
//           <div className="moon"></div>
//           <div className="moon"></div>
//         </div>
//         <div className="daytime-backgrond"></div>
//         <div className="daytime-backgrond"></div>
//         <div className="daytime-backgrond"></div>
//         <div className="cloud">
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//         </div>
//         <div className="cloud-light">
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//           <div className="cloud-son"></div>
//         </div>
//         <div className="stars">
//           <div className="star big">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//           <div className="star big">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//           <div className="star medium">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//           <div className="star medium">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//           <div className="star small">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//           <div className="star small">
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//             <div className="star-son"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayNight;