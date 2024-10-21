"use client";
import React, { useEffect, useRef } from 'react';
import { useBackground } from '@/context/BackgroundContext';

const BackgroundImage: React.FC = () => {
  const { bgImage } = useBackground();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundImage = bgImage === "none" ? "none" : `url(${bgImage})`;
    }
  }, [bgImage]);

  return (
    <section
      ref={backgroundRef}
      // transition-brightness duration-100 ease-in-out
      className="fixed inset-0 z-[-1] 
      dark:brightness-[.75]  bg-no-repeat bg-fixed bg-center h-full w-full bg-cover blur-sm"
    >
      {/* dark:brightness-[.25] */}
    </section>
  );
};

export default BackgroundImage;