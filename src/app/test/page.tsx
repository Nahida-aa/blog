"use client";
import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const code = `
def my_function():
    pass
`;

export default function CodeEditor() {
  const codeHTML = (
    <MonacoEditor
      height="500px"
      defaultLanguage="python"
      defaultValue={code}
      theme="vs-dark"
    />
  );
  console.log(codeHTML);
  return (
    <MonacoEditor
      height="500px"
      defaultLanguage="python"
      defaultValue={code}
      theme="vs-dark"
    />
  );
}