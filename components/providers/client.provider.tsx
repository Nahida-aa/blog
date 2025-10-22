"use client";
import { ProgressProvider } from "@bprogress/next/app";
import { HeroUIProvider } from "@heroui/react";

export const CLientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ProgressProvider
        height="3px"
        color="#a6e3a1"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </HeroUIProvider>
  );
};
