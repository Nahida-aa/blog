// src/context/TocContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface TocContextType {
  isTocOpen: boolean;
  toggleToc: () => void;
}

const TocContext = createContext<TocContextType | undefined>(undefined);

export const TocProvider = ({ children }: { children: ReactNode }) => {
  const [isTocOpen, setTocOpen] = useState(false);

  const toggleToc = () => {
    console.log('src/context/TocContext.tsx: toc');
    setTocOpen(!isTocOpen);
  }

  return (
    <TocContext.Provider value={{ isTocOpen,  toggleToc }}>
      {children}
    </TocContext.Provider>
  );
};

export const useToc = () => {
  const context = useContext(TocContext);
  if (context === undefined) {
    throw new Error('useToc must be used within a TocProvider');
  }
  return context;
};