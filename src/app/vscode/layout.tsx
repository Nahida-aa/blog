// src/app/vscode/layout.tsx
import { BackgroundProvider } from "@/context/BackgroundContext";
import { Navbar } from '@/components/layout/nav';
import BackgroundImage  from '@/components/bg/BackgroundImage'
import Script from 'next/script'

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script src="/vscode/Comet.js" strategy="lazyOnload" />
      <BackgroundProvider>
        <Navbar />
        {children}
        <BackgroundImage />
      </BackgroundProvider>
    </>
  );
}