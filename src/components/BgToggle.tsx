"use client";
import { useState, useEffect, SetStateAction } from 'react';
import { Image as ImageIcon, X, Repeat } from 'lucide-react';
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const images = [
  { src: "none", label: "None", icon: X },
  { src: "/bg/cloud.webp", label: "cloud", thumbnail: "/bg/thumbnail/cloud-24.webp" },
  { src: "/bg/mountain_lake.webp", label: "mountain_lake", thumbnail: "/bg/thumbnail/mountain_lake-24.webp" },
  { src: "/bg/pink_dream.webp", label: "pink_dream", thumbnail: "/bg/thumbnail/pink_dream-24.webp" },
  { src: "auto", label: "Auto Cycle", icon: Repeat }
];

export default function BgToggle() {
  const [bgImage, setBgImage] = useState("/bg/cloud.webp"); // 设置默认壁纸
  const [autoCycle, setAutoCycle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 设置初始背景图片
    document.body.style.backgroundImage = `url(${bgImage})`;
  }, [bgImage]);

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
      document.body.style.backgroundImage = nextImage === "none" ? "none" : `url(${nextImage})`;
    }
  }, [currentImageIndex, autoCycle]);

  const handleBgChange = (image: SetStateAction<string>) => {
    if (image === "auto") {
      setAutoCycle(true);
    } else {
      setAutoCycle(false);
      setBgImage(image);
      document.body.style.backgroundImage = image === "none" ? "none" : `url(${image})`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-2 focus:outline-none flex">
          <ImageIcon size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0 w-full">
        {images.map(({ src, label, icon: Icon, thumbnail }) => (
          <DropdownMenuItem key={src} onClick={() => handleBgChange(src)}>
            {Icon ? (
              <Icon size={20} className="relative w-6 h-6 mr-2" />
            ) : (
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src={thumbnail}
                  alt={label}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded"
                />
              </div>
            )}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}