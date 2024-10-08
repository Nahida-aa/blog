// src/app/(blog)/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
      <BackgroundProvider>
        <Navbar />
        {children}
        <BackgroundImage />
      </BackgroundProvider>
  );
}