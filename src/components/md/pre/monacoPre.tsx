"use client";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import * as monaco_editor from 'monaco-editor';
import { registerJsoncLanguage } from '@/lib/vscode/monaco/addLang/addJsonc';
import { languageMap } from '@/lib/vscode/monaco/addLang/languageMap'
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme';

interface OnlyReadEditorProps {
  value: string;
  language: string;
  // path: string;
  initialHeight: number;
  loadingComponent?: ReactNode;
  containerRef: React.RefObject<HTMLPreElement | null>;
}

const OnlyReadEditor = ({ value, language, 
  // path, 
  initialHeight, loadingComponent, containerRef }: OnlyReadEditorProps) => {
  const [editorHeight, setEditorHeight] = useState(initialHeight);
  // const editorRef = useRef<monaco_editor.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const height = computerHeight(value, 20, 25);
    setEditorHeight(height);
  }, [value]);

  loader.config({
    paths: {
      vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
    },
  });

  useEffect(() => {
    loader.init().then(monaco => {
      registerJsoncLanguage(monaco);
      monaco.editor.defineTheme('aaTheme', aaThemeConfig);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,
        allowNonTsExtensions: true, // 允许非ts文件扩展名
        allowJs: true,
        checkJs: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        noEmit: true,
        strict: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        isolatedModules: true,
        jsxFactory: 'React.createElement',
        jsxFragmentFactory: 'React.Fragment'
      });
    });
  }, []);

  const handleEditorDidMount = (editor: monaco_editor.editor.IStandaloneCodeEditor, monaco: typeof monaco_editor) => {
    // editorRef.current = editor;
    // monaco.editor.defineTheme('aaTheme', aaThemeConfig);
    console.log(monaco);
    // 监听编辑器的滚动事件并传递给外部容器
    editor.getDomNode()?.addEventListener('wheel', (e) => {
      const container = containerRef.current;
      if (container) {
        container.scrollTop += e.deltaY;
      }
    });
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setEditorHeight(entry.contentRect.height - 31.99); // 32 is the height of the nav
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

  return (
    <>
      <MonacoEditor
        height={editorHeight}
        language={language}
        value={value}
        // path={path}
        theme="aaTheme"
        options={{
          // readOnly: true,
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false, // 禁止滚动超过最后一行
          // lineNumbers: 'off', // 隐藏行号
          glyphMargin: false, // 隐藏左侧空白
          // folding: false, // 隐藏代码折叠
          lineDecorationsWidth: 0, // 隐藏行号右侧空白
          lineNumbersMinChars: 0, // 隐藏行号左侧空白
          hover: { sticky: true },
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "CodeNewRoman Nerd Font Mono",
          fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
          cursorStyle: "block",
          scrollbar: {
            handleMouseWheel: false, // 禁用滚动条鼠标滚轮事件
            // alwaysConsumeMouseWheel: true,
          },
        }}
        onMount={handleEditorDidMount}
        loading={<div style={{ position: 'absolute', top: -8, left: 22 }}>{loadingComponent}</div>}
      />
    </>
  );
};

interface CodeBlockProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children: React.ReactElement<any>;
  name?: string;
  path?: string;
  filename?: string;
  copy?: string;
}
const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLPreElement | null>(null);

  const { className, children: codeStringProp, ...rest } = children.props;
  const codeString = (codeStringProp || '').toString();
  const languageKey = className ? className.replace('language-', '') : 'plaintext'
  const language = languageMap[languageKey] || languageKey;
  const codeBlockName = props.name || props.path || props.filename || language;
  const copy = props.copy !== '0'

  const initialHeight = computerHeight(codeString.trim(), 20, 25);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  };

  return (
    <pre ref={containerRef} className={` flex flex-col w-full max-h-[60vh]  resize-y min-h-[${60}px] ${className}`} {...props}>
      {codeBlockName && (
        <nav className='flex items-center justify-between h-[32px]'>
          <div className=' ml-2 px-2 flex items-center'>
            {codeBlockName}
          </div>
          {copy && (
            <Button variant='ghost'
              onClick={handleCopy}
              className='h-6 m-2  p-1 rounded'
            >
              {copied ? <Check size={16} className='text-green-500' /> : <Copy size={16} className='text-gray-400' />}
            </Button>
          )}
        </nav>
      )}
      <OnlyReadEditor value={codeString.trim()} language={language} 
      // path={codeBlockName}
      initialHeight={initialHeight} loadingComponent={children} containerRef={containerRef} {...rest} />
    </pre>
  );
};

type ComputerHeight = (codeString: string, lineHeight: number, maxLines: number) => number;
const computerHeight: ComputerHeight = (codeString, lineHeight, maxLines) => {
  const lineCount = codeString.split('\n').length;
  return Math.min(lineCount, maxLines) * lineHeight + 10;
};

interface PreProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: ReactNode;
  name?: string;
  path?: string;
  filename?: string;
  copy?: string
}
export const Pre = ({ children, ...props }: PreProps) => {
  if (React.isValidElement(children) && children.props && children.type === 'code') return <CodeBlock {...props}>{children}</CodeBlock>;
  return <pre {...props}>{children}</pre>;
};