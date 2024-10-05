"use client";
import React, { ReactNode, useEffect } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import * as monaco_editor from 'monaco-editor';

const languageMap: { [key: string]: string } = {
  jsx: 'javascript',
  js: 'javascript',
  tsx: 'typescript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  sh: 'shell',
  // jsonc: 'json',
};

interface EditorProps {
  value: string;
  languageKey: string;
  path: string;
}
const Editor = ({ value, languageKey, path }: EditorProps) => {
  loader.config(
    // { monaco_editor }
    {
      paths: {
        // TODO: 
        vs: 'https://blog.nahida-aa.us.kg/monaco/min/vs',
      },
    }
  );

  // useEffect(() => {
  //   loader.init().then(monaco => {
  //     monaco.editor.defineTheme('vs-dark', {
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
  // 注册 jsonc 语言 ???
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.languages.register({ id: 'jsonc' });
      monaco.languages.setMonarchTokensProvider('jsonc', {
        tokenizer: {
          root: [
            [/{/, 'delimiter.bracket'],
            [/}/, 'delimiter.bracket'],
            [/\[/, 'delimiter.array'],
            [/\]/, 'delimiter.array'],
            [/"/, 'string'],
            [/:/, 'delimiter'],
            [/,/, 'delimiter'],
            [/\/\/.*$/, 'comment'],
            [/\/\*.*\*\//, 'comment'],
            [/\d+/, 'number'],
            [/\b(true|false|null)\b/, 'keyword'],
          ],
        },
      });
      monaco.languages.setLanguageConfiguration('jsonc', {
        comments: {
          lineComment: '//',
          blockComment: ['/*', '*/'],
        },
        brackets: [
          ['{', '}'],
          ['[', ']'],
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '"', close: '"', notIn: ['string'] },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '"', close: '"' },
        ],
      });
    });
  }, []);

  const handleEditorDidMount = (editor: monaco_editor.editor.IStandaloneCodeEditor, monaco: typeof monaco_editor) => {
    console.log('editorDidMount', editor, monaco);
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
      onMount={handleEditorDidMount}
    />
  );
};

export default Editor;

interface PreProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: ReactNode;
  name?: string;
  path?: string;
  filename?: string;
}
export const Pre = ({ children, ...props }:PreProps) => {
  if (!children) return <pre {...props}>{children}</pre>
  // 检查 children 是否是 <code> 元素
  console.log(`Pre children: ${children}`)
  console.log(`Pre props: ${props}`)
  const codeBlockName = props.name || props.path || props.filename
  console.log(`Pre codeBlockName: ${codeBlockName}`)
  if (React.isValidElement(children) && children.props && children.type === 'code') {
    const { className, children: codeString, ...rest } = children.props;
    const languageKey = className.replace('language-', '');
    return (
      <pre {...props}><Editor value={codeString.trim()} languageKey={languageKey} path={codeBlockName} {...rest} />
      </pre>
    );
  }
  return <pre {...props}>{children}</pre>;
};