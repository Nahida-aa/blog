"use client";
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
// import * as monaco_editor from 'monaco-editor';

import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme';
loader.config({
  paths: {
    vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
  },
});
const VSCodePage = () => {
  const [editorHeight, 
    // setEditorHeight
  ] = useState(600);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const editorRef = useRef<monaco_editor.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {

    loader.init().then(monaco => {
      monaco.editor.defineTheme('aaTheme', aaThemeConfig);
    });
  }, []);

  // const handleEditorDidMount = (editor: monaco_editor.editor.IStandaloneCodeEditor, monaco: typeof monaco_editor) => {
  //   editorRef.current = editor;

  // };


  return (
    <div ref={containerRef} className="vscode-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      <MonacoEditor
        height={editorHeight}
        language="typescript"
        theme="aaTheme"
        value={`// 这是一个初始值示例
function greet() {
  console.log("Hello, world!");
}

greet();`}
        options={{
          readOnly: true, // 设置为只读模式
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          hover: { sticky: true },
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "CodeNewRoman Nerd Font Mono",
          fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
          cursorStyle: 'block', // 设置光标样式为块光标
        }}
        // onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default VSCodePage;