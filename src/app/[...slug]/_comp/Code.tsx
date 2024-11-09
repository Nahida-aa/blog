// src/app/[slug]/_comp/code.tsx
"use client"
import MonacoEditor, { loader } from '@monaco-editor/react'
import Script from 'next/script';
import { useEffect } from 'react';
import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme'
import { languageMap } from '@/lib/vscode/monaco/addLang/languageMap'

loader.config({
  paths: {
    vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
  },
})
interface CodeViewerProps {
  format: string;
  content: string;
}
export default function Code({ format,content }: CodeViewerProps) {
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('aaTheme', aaThemeConfig);
    });
  }, []);
  const language = languageMap[format] || 'plaintext';
  return (
    <div className=" mx-auto rounded-md h-[90vh] ">
      <Script src="/vscode/Comet.js" strategy="lazyOnload" />
      <MonacoEditor
        theme='aaTheme'
        // height="90vh"
        height="100%"
        // defaultLanguage="markdown"
        language={language}
        value={content}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontFamily: "CodeNewRoman Nerd Font Mono",
          fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
          cursorStyle: 'block',
          scrollbar: {
            // vertical: 'hidden',
            // horizontal: 'hidden',
            alwaysConsumeMouseWheel: false, // 不总是 消耗鼠标滚轮事件,即当滚动条到底部时，继续滚动鼠标滚轮，页面也会滚动
          }
        }}
      />
    </div>
  );
}