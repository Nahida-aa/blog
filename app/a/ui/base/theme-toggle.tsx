"use client";

import * as React from "react";
import { Moon, MoonIcon, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Easing, motion, Variants } from "framer-motion";
import { flushSync } from "react-dom"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { useIsClient, useIsMounted } from 'usehooks-ts'

export function ModeToggleMenu({
  variant = "outline",
  className = "",
}: {
  variant?:
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null;
  className?: string;
}) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className={cn(`${className}`)}>
          <Sun
            className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            size={16}
          />
          <MoonStar
            className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            size={16}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-auto">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ModeToggle = ({
  variant = "outline",
  className = "",
}: {
  variant?:
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null;
  className?: string;
}) => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      className={` ${className}`}
      onClick={onClick}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const LoadIcon = ({
  size
}: {
  size: number;
}) => (
  <button className={`size-10 items-center justify-center p-${5 - size / 8} [&_svg]:size-${size / 4}`}>
    <motion.svg viewBox="0 0 100 100" strokeWidth="4" strokeLinecap="round">
      <motion.path
        d="M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z"
        stroke="#60a5fa"
        fillOpacity="0.35"
        strokeOpacity="1"
        fill="#60a5fa"
        initial={{ scale: 2 }}
      ></motion.path>
    </motion.svg>
  </button>
);

export const ModeToggleGradientIcon = ({
  className = "",
  duration = 400,
  size = 24,
}: {
  className?: string;
  duration?: number;
  size?: number;
}) => {
  const { setTheme, theme } = useTheme()
  const isDark = theme === "dark"
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  // console.log(theme)
  const isClient = useIsClient()
  const toggleTheme = React.useCallback(async () => {
    if (!buttonRef.current) return

    // 如果浏览器不支持 View Transition，就直接切换
    // if (!("startViewTransition" in document)) {
    //   setTheme(isDark ? "light" : "dark")
    //   return
    // }
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(isDark ? "light" : "dark")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, setTheme])
  // if (typeof window === "undefined") return null;
  if (!isClient) return LoadIcon({ size });

  const raysVariants: Variants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as Easing,
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear" as Easing,
      },
    },
  };
  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  return <Suspense fallback={<LoadIcon size={size} />}>
    <button
      ref={buttonRef}
      className={`flex items-center justify-center relative gap-0 size-10 p-auto [&_svg]:size-${size / 4} ${className}`}
      onClick={toggleTheme}
    >
      <motion.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={size}
        height={size}
        viewBox={`${isDark ? "0 0 100 100" : "0 0 100 100"}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block m-auto"
        style={{
          transformOrigin: "50px 50px",
          transform: "translate(0px, 0px)", // Ensure no initial offset
        }}
      >
        <motion.path
          variants={shineVariant}
          d={moonPath}
          className={"absolute top-0 left-0 stroke-blue-100 "}
          initial="hidden"
          animate={isDark ? "visible" : "hidden"}
        />

        <motion.g
          variants={raysVariants}
          initial="hidden"
          animate={isDark ? "hidden" : "visible"}
          className="stroke-6 stroke-yellow-600 "
          style={{ strokeLinecap: "round" }}
        >
          <motion.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <motion.path variants={rayVariant} d="M85 15L78 22" />
          <motion.path variants={rayVariant} d="M98 50H89" />
          <motion.path variants={rayVariant} d="M85 85L78 78" />
          <motion.path variants={rayVariant} d="M50 98V89" />
          <motion.path variants={rayVariant} d="M23 78L16 84" />
          <motion.path variants={rayVariant} d="M11 50H2" />
          <motion.path variants={rayVariant} d="M23 23L16 16" />
        </motion.g>
        <motion.path
          fill="transparent"
          transition={{
            duration: 1,
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
          initial={{
            fillOpacity: 0,
            strokeOpacity: 0, // Use the correct path from the start based on theme
            d: isClient && isDark ? moonPath : sunPath, // INFO
          }}
          animate={
            isDark
              ? {
                d: moonPath,
                rotate: -360,
                scale: 2,
                // transformOrigin: "49.5px 49.5px",
                stroke: "#60a5fa",
                fill: "#60a5fa",
                fillOpacity: 0.35,
                strokeOpacity: 1,
                transition: { delay: 0.1 },
              }
              : {
                d: sunPath,
                scale: 1,
                rotate: 0,
                stroke: "#ca8a04",
                fill: "#ca8a04",
                fillOpacity: 0.35,
                strokeOpacity: 1,
              }
          }
        // style={ isDark ?{
        //   transformOrigin: "49.5px 49.5px", // Explicitly set transform origin to center
        //   // transform: "translate(0, 0)", // Ensure no initial offset
        // }:{}}
        // style={{
        //   x: 0,
        //   y: 0,
        //   transformBox: "fill-box",
        //   transformOrigin: "center",
        // }}
        />
      </motion.svg>
    </button>
  </Suspense>
}

export const ThemeIcon = () => {
  const [isClient, setIsClient] = useState(false);
  const { setTheme, theme } = useTheme()
  const isDark = theme === "dark"
  useEffect(() => {
    setIsClient(true);
  }, [])
  const raysVariants: Variants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as Easing,
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear" as Easing,
      },
    },
  };
  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  return <motion.svg
    strokeWidth="4"
    strokeLinecap="round"
    width={24}
    height={24}
    viewBox={`${isDark ? "0 0 100 100" : "0 0 100 100"}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative block m-auto"
    style={{
      transformOrigin: "50px 50px",
      transform: "translate(0px, 0px)", // Ensure no initial offset
    }}
  >
    <motion.path
      variants={shineVariant}
      d={moonPath}
      className={"absolute top-0 left-0 stroke-blue-100 "}
      initial="hidden"
      animate={isDark ? "visible" : "hidden"}
    />

    <motion.g
      variants={raysVariants}
      initial="hidden"
      animate={isDark ? "hidden" : "visible"}
      className="stroke-6 stroke-yellow-600 "
      style={{ strokeLinecap: "round" }}
    >
      <motion.path
        className="origin-center"
        variants={rayVariant}
        d="M50 2V11"
      />
      <motion.path variants={rayVariant} d="M85 15L78 22" />
      <motion.path variants={rayVariant} d="M98 50H89" />
      <motion.path variants={rayVariant} d="M85 85L78 78" />
      <motion.path variants={rayVariant} d="M50 98V89" />
      <motion.path variants={rayVariant} d="M23 78L16 84" />
      <motion.path variants={rayVariant} d="M11 50H2" />
      <motion.path variants={rayVariant} d="M23 23L16 16" />
    </motion.g>
    <motion.path
      fill="transparent"
      transition={{
        duration: 1,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      initial={{
        fillOpacity: 0,
        strokeOpacity: 0, // Use the correct path from the start based on theme
        d: isClient && isDark ? moonPath : sunPath, // INFO
      }}
      animate={
        isDark
          ? {
            d: moonPath,
            rotate: -360,
            scale: 2,
            // transformOrigin: "49.5px 49.5px",
            stroke: "#60a5fa",
            fill: "#60a5fa",
            fillOpacity: 0.35,
            strokeOpacity: 1,
            transition: { delay: 0.1 },
          }
          : {
            d: sunPath,
            scale: 1,
            rotate: 0,
            stroke: "#ca8a04",
            fill: "#ca8a04",
            fillOpacity: 0.35,
            strokeOpacity: 1,
          }
      }
    // style={ isDark ?{
    //   transformOrigin: "49.5px 49.5px", // Explicitly set transform origin to center
    //   // transform: "translate(0, 0)", // Ensure no initial offset
    // }:{}}
    // style={{
    //   x: 0,
    //   y: 0,
    //   transformBox: "fill-box",
    //   transformOrigin: "center",
    // }}
    />
  </motion.svg>
}