'use client'

import { Button } from '@/components/ui/button'
import { CheckIcon, Copy } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'
// import 'tailwind-scrollbar'

type CodeSnippet = {
  value: string
  language: string
}

export type LineNumbersType = 'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string)

interface AaViewOptions {
  lineNumbers?: LineNumbersType
  wrapLines?: boolean
}

interface CodeBlockProps extends CodeSnippet {
  options?: AaViewOptions
  showLineNumbers?: boolean
  wrapLines?: boolean
}

const CodeBlock = ({ value, language, options }: CodeBlockProps) => {
  const { lineNumbers = 'off', wrapLines = false } = options || {}

  return (
    <div className="relative overflow-hidden">

      {/* <pre className={`rounded-md ${wrapLines ? '' : 'overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-secondary/20'}`}> */}
        <Highlight theme={themes.oceanicNext} code={value} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div
              className={`${className} rounded-md overflow-hidden px-4 py-2 ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'} ${wrapLines ? '' : 'overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-secondary/20'}`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                  {lineNumbers === 'on' && (
                    <span className="table-cell text-right pr-4 select-none opacity-50">
                      {i + 1}
                    </span>
                  )}
                  <span className={`table-cell ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Highlight>
      {/* </div> */}
    </div>
  )
}

// Example usage
const longCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci number \${i}: \${fibonacci(i)}\`);
}

// This is a very long line of code that should cause horizontal scrolling when wrapLines is set to false. It demonstrates the scrollbar functionality we've implemented.
`.trim()

export default function CodeBlockDemo() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Code Block Demo</h1>
      <div className="space-y-2">
        <h2 className="text-xl">With line wrapping:</h2>
        <CodeBlock value={longCode} language="javascript" options={{ lineNumbers: 'on', wrapLines: true }} />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl">Without line wrapping (should show scrollbar):</h2>
        <CodeBlock value={longCode} language="javascript" options={{ lineNumbers: 'on', wrapLines: false }} />
      </div>
    </div>
  )
}