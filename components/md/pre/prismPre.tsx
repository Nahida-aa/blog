"use client"
import { Button } from '@/components/ui/button'
import { CheckIcon, Copy } from 'lucide-react'
import { Highlight
  , themes // themes.vsDark, nightOwl, github, , duotoneDark, synthwave84, dracula, shadesOfPurple
} from 'prism-react-renderer'
import { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CodeSnippet = {
  value: string
  language: string
}
export type LineNumbersType = 'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string);
interface AaViewOptions {
  lineNumbers?: LineNumbersType
  wrapLines?: boolean
}
interface CodeBlockProps extends CodeSnippet {
  options?: AaViewOptions
  showLineNumbers?: boolean
  wrapLines?: boolean
}
export const CodeBlock = ({ value, language, options }: CodeBlockProps) => {
  const { lineNumbers = 'off', wrapLines = false } = options || {}
  return (
  <Highlight  theme={themes.vsDark} code={value} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <ScrollArea className={` rounded-md `}>
      <pre
        className={`${className} px-4 py-2  bg-gradient-opacity-40 border-none bg-[rgb(30,30,30)]`}
        style={style}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })} className="table-row">
            {lineNumbers==='on' && (
              <span className="table-cell text-right pr-4 select-none opacity-50">
                {i + 1}
              </span>
            )}
            <span className={`table-cell ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </span>
          </div>
        ))}
      </pre> 
      <ScrollBar orientation="horizontal" />
  </ScrollArea>
    )}
  </Highlight>
  )
}
export function CodeBlockWithCopy({ value, language, options }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (<div className="relative group ">
    <CodeBlock value={value} language={language} options={options}  />
    <Button
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
    >
      {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  </div>)
}

interface MultiLanguageCodeBlockProps {
  codeSnippets: CodeSnippet[]
  title?: string
}
export function MultiLanguageCodeBlock({ codeSnippets, title }: MultiLanguageCodeBlockProps) {
  return (
    <Tabs defaultValue={codeSnippets[0].language}>
      <div className="flex items-center space-x-4 mb-4">
        {title && <h3 className="text-base font-medium">{title}</h3>}
        <TabsList>
          {codeSnippets.map(snippet => (
            <TabsTrigger key={snippet.language} value={snippet.language} className='py-1 px-2  text-foreground  data-[state=active]:text-glow-cyan   '>
              {snippet.language}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {codeSnippets.map(snippet => (
        <TabsContent key={snippet.language} value={snippet.language}>
          <CodeBlockWithCopy value={snippet.value} language={snippet.language} options={{ lineNumbers: 'on', wrapLines: true }} />
        </TabsContent>
      ))}
    </Tabs>
  )
}