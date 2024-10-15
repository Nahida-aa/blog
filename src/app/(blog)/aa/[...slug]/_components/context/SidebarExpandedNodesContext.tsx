// src/app/(blog)/aa/[...slug]/_components/context/SidebarExpandedNodesContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarExpandedNodesContextProps {
  expandedNodes: { [key: string]: boolean };
  toggleNode: (node: string) => void;
  setExpandedNodes: (nodes: { [key: string]: boolean }) => void;
}

const SidebarExpandedNodesContext = createContext<SidebarExpandedNodesContextProps | undefined>(undefined);

export const SidebarExpandedNodesProvider = ({ children }: { children: ReactNode }) => {
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});

  const toggleNode = (node: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node]: !prev[node],
    }));
  };

  return (
    <SidebarExpandedNodesContext.Provider value={{ expandedNodes, toggleNode, setExpandedNodes }}>
      {children}
    </SidebarExpandedNodesContext.Provider>
  );
};

export const useSidebarExpandedNodes = () => {
  const context = useContext(SidebarExpandedNodesContext);
  if (!context) {
    throw new Error('useSidebarExpandedNodes must be used within a SidebarExpandedNodesProvider');
  }
  return context;
};