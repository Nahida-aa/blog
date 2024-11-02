"use client";
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme'

// export const metadata = {title: 'VSCode'}
loader.config({
  paths: {
    vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
  },
});

const VSCodePage = () => {
  const [editorHeight, setEditorHeight] = useState(600);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLPreElement | null>(null);
  const codeString = `type vscodeThemeJSON = {
  name: string
  type: 'dark' | 'light'
  semanticHighlighting: boolean // 是否启用语义高亮(即将使用语言服务器提供的语义信息来高亮)
  colors: {
    [key: string]: string
  };
  tokenColors: {
    name?: string
    scope: string | string[]
    settings: {
      [key: string]: string
    };
  }[];
};
// 这是一个初始值示例
function greet() {
  console.log("Hello, world!");
}

greet();`;

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('aaTheme', aaThemeConfig);
    });
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setEditorHeight(entry.contentRect.height - 32); // 32 is the height of the nav
        }
      }
    });
    const currentContainer = containerRef.current;
    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }
    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, [containerRef]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  };

  return (
    <>
    <pre ref={containerRef} className="vscode-container flex flex-col h-full resize-y max-h-[60vh]">
      <nav className='flex items-center justify-between h-8'>
        <div className='ml-2 px-2 flex items-center'>
          example.tsx
        </div>
        <Button variant='ghost'
          onClick={handleCopy}
          className='h-6 m-2 p-1 rounded'
        >
          {copied ? <Check size={16} className='text-green-500' /> : <Copy size={16} className='text-gray-400' />}
        </Button>
      </nav>
      <MonacoEditor
        height={editorHeight}
        language="typescript"
        theme="aaTheme"
        value={codeString}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          hover: { sticky: true },
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "CodeNewRoman Nerd Font Mono",
          fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
          cursorStyle: 'block',
        }}
      />
    </pre>
    </>
  );
};

export default VSCodePage;