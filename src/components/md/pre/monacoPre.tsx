"use client";
import React, { useRef, useEffect } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';

const languageMap: { [key: string]: string } = {
  jsx: 'javascript',
  js: 'javascript',
  tsx: 'typescript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  sh: 'shell',
  jsonc: 'json',
};

const Editor = ({ value, languageKey, path }) => {
  loader.config({
    paths: {
      // TODO: 
      vs: 'http://localhost:3000/monaco/min/vs',
    },
  });

  // useEffect(() => {
  //   loader.init().then(monaco => {
  //     monaco.editor.defineTheme('vscode-dark', {
  //       base: 'vs-dark',
  //       inherit: true,
  //       rules: [],
  //       colors: {
  //         'editor.background': '#1E1E1E',
  //       },
  //     });
  //     if (editorRef.current) {
  //       editorRef.current.updateOptions({ theme: 'vscode-dark' });
  //     }
  //   });
  // }, []);

  const handleEditorDidMount = (editor, monaco) => {
  }

  const language = languageMap[languageKey] || languageKey;
  console.log(`Editor language: ${language}`)
  return (
    <MonacoEditor
      height="400px"
      language={language}
      value={value}
      path={path}
      theme="vs-dark"
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default Editor;

export const Pre = ({ children, ...props }) => {
  // 检查 children 是否是 <code> 元素
  console.log(`Pre children: ${children}`)
  console.log(`Pre props: ${props}`)
  const codeBlockName = props.name || props.path || props.filename
  console.log(`Pre codeBlockName: ${codeBlockName}`)
  if (children.props && children.type === 'code') {
    const { className, children: codeString, ...rest } = children.props;
    const languageKey = className.replace('language-', '');
    return (
      <pre {...props}><Editor value={codeString.trim()} languageKey={languageKey} path={codeBlockName} {...rest} />
      </pre>
    );
  }
  return <pre {...props}>{children}</pre>;
};