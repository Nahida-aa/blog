// src/context/BackgroundContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BackgroundContextProps {
  bgImage: string;
  setBgImage: (image: string) => void;
  autoCycle: boolean;
  setAutoCycle: (cycle: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

const images = [
  { src: "none", label: "None" },
  { src: "/bg/cloud.webp", label: "cloud" },
  { src: "/bg/mountain_lake.webp", label: "mountain_lake" },
  { src: "/bg/pink_dream.webp", label: "pink_dream" },
  { src: "/bg/mengde_ye.webp", label: "mengde_ye" },
  { src: "auto", label: "Auto Cycle" }
];

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bgImage, setBgImage] = useState("/bg/pink_dream.webp");
  const [autoCycle, setAutoCycle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (autoCycle) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length - 2)); // 不包括 "none" 和 "auto"
      }, 3 * 60 * 1000); // 每30分钟切换一次
    }
    return () => clearInterval(interval);
  }, [autoCycle]);

  useEffect(() => {
    if (autoCycle) {
      const nextImage = images[currentImageIndex + 1].src;
      setBgImage(nextImage);
    }
  }, [currentImageIndex, autoCycle]);

  return (
    <BackgroundContext.Provider value={{ bgImage, setBgImage, autoCycle, setAutoCycle }}>
      {children}
    </BackgroundContext.Provider>
  );
};