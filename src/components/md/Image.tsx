"use client"
import NextImage, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface CustomImageProps extends ImageProps {
  srcLight?: string;
  srcDark?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ alt, src, srcLight, srcDark, width, height, ...props }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const finalSrc = srcLight && srcDark ? (isDarkMode ? srcDark : srcLight) : src

  return <NextImage alt={alt} src={finalSrc} width={width} height={height} {...props} />;
}

export default CustomImage;