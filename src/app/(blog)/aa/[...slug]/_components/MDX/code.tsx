// src/app/(blog)/aa/[slug]/_components/MDX/code.tsx
"use client"
import MonacoEditor, { loader } from '@monaco-editor/react'
import Script from 'next/script';
import { useEffect } from 'react';
import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme'

loader.config({
  paths: {
    vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
  },
})
interface CodeViewerProps {
  content: string;
}
export default function Code({ content }: CodeViewerProps) {
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('aaTheme', aaThemeConfig);
    });
  }, []);
  return (
    <div className="max-w-[1012px] mx-auto rounded-md h-[90vh] overflow-hidden">
      <Script src="/vscode/Comet.js" strategy="lazyOnload" />
      <MonacoEditor
        theme='aaTheme'
        // height="90vh"
        height="100%"
        defaultLanguage="markdown"
        value={content}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontFamily: "CodeNewRoman Nerd Font Mono",
          fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
          cursorStyle: 'block',
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          }
        }}
      />
    </div>
  );
}