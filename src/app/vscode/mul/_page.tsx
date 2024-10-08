// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import MonacoEditor, { loader } from '@monaco-editor/react';
// import * as monaco_editor from 'monaco-editor';
// import { Button } from '@/components/ui/button';
// import { Copy, Check } from 'lucide-react';
// import aaThemeConfig from '@/lib/vscode/monaco/theme/aaTheme';
// import { createCursorHandler } from '@/lib/vscode/monaco/theme/Comet';

// const MultiEditorsPage = () => {
//   const [copied, setCopied] = useState(false);
//   const editorRefs = useRef<monaco_editor.editor.IStandaloneCodeEditor[]>([]);

//   useEffect(() => {
//     loader.config({
//       paths: {
//         vs: `${process.env.NODE_ENV === "production" ? 'https://blog.nahida-aa.us.kg/' : 'http://localhost:3000'}/monaco/min/vs`,
//       },
//     });

//     loader.init().then(monaco => {
//       monaco.editor.defineTheme('aaTheme', aaThemeConfig);
//     });
//   }, []);

//   const handleEditorDidMount = (editor: monaco_editor.editor.IStandaloneCodeEditor, index: number) => {
//     editorRefs.current[index] = editor;
//     createCursorHandler({
//       cursorUpdatePollingRate: 500,
//       onStarted: (editor) => {
//         console.log(`Editor ${index + 1} started`);
//       },
//       onCursorPositionUpdated: (x, y) => {
//         console.log(`Editor ${index + 1} cursor moved to (${x}, ${y})`);
//       },
//       onEditorSizeUpdated: (x, y) => {
//         console.log(`Editor ${index + 1} size updated to (${x}, ${y})`);
//       },
//       onCursorSizeUpdated: (x, y) => {
//         console.log(`Editor ${index + 1} cursor size updated to (${x}, ${y})`);
//       },
//       onCursorVisibilityChanged: (visibility) => {
//         console.log(`Editor ${index + 1} cursor visibility changed to ${visibility}`);
//       },
//       onLoop: () => {
//         console.log(`Editor ${index + 1} loop`);
//       },
//       onReady: () => {
//         console.log(`Editor ${index + 1} ready`);
//       },
//     }, `editor-container-${index + 1}`);
//   };

//   const handleCopy = (index: number) => {
//     const editor = editorRefs.current[index];
//     if (editor) {
//       const code = editor.getValue();
//       navigator.clipboard.writeText(code).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       }).catch(err => {
//         console.error('Failed to copy code: ', err);
//       });
//     }
//   };

//   return (
//     <div className="multi-editors-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', backgroundColor: '#282C34' }}>
//       <div id="editor-container-1" className="editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <nav className="editor-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
//           <div>Editor 1</div>
//           <Button variant='ghost' onClick={() => handleCopy(0)} className='h-6 m-2 p-1 rounded'>
//             {copied ? <Check size={16} className='text-green-500' /> : <Copy size={16} className='text-gray-400' />}
//           </Button>
//         </nav>
//         <MonacoEditor
//           height="300px"
//           language="typescript"
//           theme="aaTheme"
//           value={`// 这是编辑器 1 的初始值
// function greet() {
//   console.log("Hello from Editor 1!");
// }

// greet();`}
//           options={{
//             readOnly: false,
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             hover: { sticky: true },
//             fontSize: 14,
//             lineHeight: 20,
//             fontFamily: "CodeNewRoman Nerd Font Mono",
//             fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
//             cursorStyle: 'block', // 设置光标样式为块光标
//           }}
//           onMount={(editor) => handleEditorDidMount(editor, 0)}
//         />
//       </div>
//       <div id="editor-container-2" className="editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <nav className="editor-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
//           <div>Editor 2</div>
//           <Button variant='ghost' onClick={() => handleCopy(1)} className='h-6 m-2 p-1 rounded'>
//             {copied ? <Check size={16} className='text-green-500' /> : <Copy size={16} className='text-gray-400' />}
//           </Button>
//         </nav>
//         <MonacoEditor
//           height="300px"
//           language="typescript"
//           theme="aaTheme"
//           value={`// 这是编辑器 2 的初始值
// function greet() {
//   console.log("Hello from Editor 2!");
// }

// greet();`}
//           options={{
//             readOnly: false,
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             hover: { sticky: true },
//             fontSize: 14,
//             lineHeight: 20,
//             fontFamily: "CodeNewRoman Nerd Font Mono",
//             fontLigatures: "'calt', 'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09'",
//             cursorStyle: 'block', // 设置光标样式为块光标
//           }}
//           onMount={(editor) => handleEditorDidMount(editor, 1)}
//         />
//       </div>
//     </div>
//   );
// };

// export default MultiEditorsPage;