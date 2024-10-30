'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import remarkFrontmatter from 'remark-frontmatter'
import { VFile } from 'vfile'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { CodeBlockWithCopy} from '@/components/md/pre/prismPre'
import { removePosition } from 'unist-util-remove-position'
import { visit as visitEstree } from 'estree-util-visit'
import ReactDOMServer from 'react-dom/server'

import remarkHighlight  from '@/components/md/remark/highlightMark'
import { defaultMDX } from './default'

import { Node as UnistNode } from 'unist'
// import { Node as HastNode } from 'hast'
import { Node as MdastNode } from 'mdast'
import { Node as EstreeNode } from 'estree'

const allRemarkPlugins = { remarkGfm, remarkMath, remarkFrontmatter, remarkHighlight }
const allRehypePlugins = { rehypeKatex, rehypePrism }

const Page: React.FC = () => {
  const [input, setInput] = useState(defaultMDX)
  const [output, setOutput] = useState<React.ReactNode | null>(null)
  const [show, setShow] = useState('preview')
  const [development, setDevelopment] = useState(false)
  const [jsxOption, setJsxOption] = useState(false)
  const [outputFormat, setOutputFormat] = useState<'function-body' | 'program'>('function-body')
  const [inputFormat, setInputFormat] = useState('mdx')
  const [selectedRemarkPlugins, setSelectedRemarkPlugins] = useState<string[]>([])
  const [selectedRehypePlugins, setSelectedRehypePlugins] = useState<string[]>([])

  useEffect(() => {
    const compileAndRender = async () => {
      let ast: UnistNode | undefined
      function captureMdast() {
        return (tree: UnistNode) => {
          ast = structuredClone(tree)
        }
      }
      function captureHast() {
        return (tree: UnistNode) => {
          ast = structuredClone(tree)
        }
      }
      function captureEsast() {
        return (tree: EstreeNode) => {
          ast = structuredClone(tree)
          visitEstree(ast as EstreeNode, removeFromEstree)
        }
      }
      function removeFromEstree(node: any) {
        delete node.loc
        delete node.start
        delete node.end
        delete node.range
      }
      try {
        const file = new VFile({
          basename: inputFormat === 'md' ? 'example.md' : 'example.mdx',
          value: input
        })

        const recmaPlugins = []
        const rehypePluginsWithCapture = selectedRehypePlugins.map(plugin => allRehypePlugins[plugin as keyof typeof allRehypePlugins])
        const remarkPluginsWithCapture = selectedRemarkPlugins.map(plugin => allRemarkPlugins[plugin as keyof typeof allRemarkPlugins])

        if (show === 'mdAst') {
          remarkPluginsWithCapture.push(captureMdast)
        } else if (show === 'jsAst') {
          recmaPlugins.push(captureEsast)
        } else if (show === 'htmlAst') {
          rehypePluginsWithCapture.push(captureHast)
        } else {
          remarkPluginsWithCapture.push(captureMdast)
        }
        
        await compile(file, {
          development,
          jsx: jsxOption,
          outputFormat,
          recmaPlugins,
          rehypePlugins: rehypePluginsWithCapture,
          remarkPlugins: remarkPluginsWithCapture,
        })

        if (ast) {
          removePosition(ast, { force: true })
          setOutput(<CodeBlockWithCopy value={JSON.stringify(ast, null, 2)} language="json" />)
        } else if (show === 'preview') {
          const { default: Content } = await run(String(file), { Fragment, jsx, jsxs })
          setOutput(<Content />)
        } else if (show === 'code') {
          setOutput(<CodeBlockWithCopy value={String(file)} language="jsx" />)
        } else if (show === 'html') {
          const { default: Content } = await run(String(file), { Fragment, jsx, jsxs })
          const codeHtml = ReactDOMServer.renderToString(<Content />)
          setOutput(<CodeBlockWithCopy value={codeHtml} language="html" />)
        } else {
          setOutput(<CodeBlockWithCopy value={String(file)} language="javascript" />)
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        setOutput(<div>Error: {errorMessage}</div>)
      }
    }

    compileAndRender()
  }, [show, development, jsxOption, outputFormat, inputFormat, selectedRemarkPlugins, selectedRehypePlugins, input])

  const handlePluginChange = (pluginType: 'remark' | 'rehype', pluginName: string) => {
    if (pluginType === 'remark') {
      setSelectedRemarkPlugins(prev =>
        prev.includes(pluginName) ? prev.filter(p => p !== pluginName) : [...prev, pluginName]
      )
    } else {
      setSelectedRehypePlugins(prev =>
        prev.includes(pluginName) ? prev.filter(p => p !== pluginName) : [...prev, pluginName]
      )
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Improved MDX Playground</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="inputFormat">Input Format:</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger id="inputFormat">
                  <SelectValue placeholder="Select input format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdx">MDX</SelectItem>
                  <SelectItem value="md">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="show">Show:</Label>
              <Select value={show} onValueChange={setShow}>
                <SelectTrigger id="show">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preview">Preview</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="mdAst">Markdown AST</SelectItem>
                  <SelectItem value="jsAst">JavaScript AST</SelectItem>
                  <SelectItem value="htmlAst">HTML AST</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-4 items-center w-full">
            <div className="flex items-center ">
              <Label htmlFor="outputFormat" >Output Format:</Label>
              <Select value={outputFormat} onValueChange={(value) => setOutputFormat(value as 'function-body' | 'program')}>
                <SelectTrigger id="outputFormat" className="w-auto">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="function-body">Function Body</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 ">
              <Label htmlFor="development">Development:</Label>
              <Checkbox
                id="development"
                checked={development}
                onCheckedChange={(checked) => setDevelopment(checked as boolean)}
              />
            </div>
            <div className="flex items-center space-x-2 ">
              <Label htmlFor="jsxOption">JSX:</Label>
              <Checkbox
                id="jsxOption"
                checked={jsxOption}
                onCheckedChange={(checked) => setJsxOption(checked as boolean)}
              />
            </div>
          </div>
          <div>
            <Label>Remark Plugins:</Label>
            <div className="flex space-x-4">
              {Object.entries(allRemarkPlugins).map(([key]) => (
                <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedRemarkPlugins.includes(key)}
                  onCheckedChange={(checked) => handlePluginChange('remark', key)}
                />
                <Label htmlFor={key}>{key}</Label>
              </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Rehype Plugins:</Label>
            <div className="flex space-x-4">
              {Object.entries(allRehypePlugins).map(([key]) => (
                <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedRemarkPlugins.includes(key)}
                  onCheckedChange={(checked) => handlePluginChange('remark', key)}
                />
                <Label htmlFor={key}>{key}</Label>
              </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input">Input</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={20}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="output">Output</Label>
              {output}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Page