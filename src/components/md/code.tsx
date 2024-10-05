"use client";
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { OnMount, type Monaco } from '@monaco-editor/react';

const languageMap: { [key: string]: string } = {
  sh: 'shell',
  bash: 'shell',
  py: 'python',
  tsx: 'typescript',
  js: 'javascript',
  ts: 'typescript',
  html: 'html',
  css: 'css',
  json: 'json',
  xml: 'xml',
  md: 'markdown',
  sql: 'sql',
  rb: 'ruby',
  php: 'php',
  go: 'go',
  swift: 'swift',
  kt: 'kotlin',
  // 添加更多映射
};

export function Code({ children, className,...props }: { children: string | undefined, className?: string }) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editorHeight, setEditorHeight] = useState('auto');
  const maxLines = 25; // 最大显示行数

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(children);
      adjustEditorHeight();
    }
  }, [children]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setEditorHeight(`${containerRef.current.clientHeight}px`);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const adjustEditorHeight = () => {
    if (editorRef.current && monacoRef.current) {
      const lineHeight = editorRef.current.getOption(monacoRef.current.editor.EditorOption.lineHeight); // 获取行高
      const model = editorRef.current.getModel();
      const lineCount = model?.getLineCount() || 1; // 获取行数

      const height = lineHeight * Math.min(lineCount, maxLines); // 限制最大行数
      setEditorHeight(`${height}px`);
      console.log(`lineHeight: ${lineHeight}, lineCount: ${lineCount}, height: ${height}`);
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    adjustEditorHeight();
    editor.onDidChangeModelContent(() => {
      adjustEditorHeight();
    });
  };

  const languageKey = className?.split('-')[1] || 'plaintext';
  const language = languageMap[languageKey] || languageKey;

  return (
    <code  ref={containerRef} className={`w-full max-h-[60vh] overflow-auto resize-y min-h-[${19}px] ${className}`} {...props}>
      <MonacoEditor
        height={editorHeight}
        defaultLanguage={language}
        value={children}
        theme="vs-dark" // 使用默认主题
        options={{
          readOnly: true,
          minimap: { enabled: false },
          // lineNumbers: 'off',
          // folding: false,
          // scrollBeyondLastLine: false,
        }}
        onMount={handleEditorMount}
        // {...props}
      />
    </code>
  );
}