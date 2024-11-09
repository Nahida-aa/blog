'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const searchEngines = [
  { name: 'Edge', url: 'https://www.bing.com/search?q=' },
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'ChatGPT', url: 'https://chat.openai.com/?q=' },
  { name: 'v0', url: 'https://v0.dev/search?q=' },
  { name: 'GitHub', url: 'https://github.com/search?q=' },
  { name: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=' },
  { name: 'X (Twitter)', url: 'https://twitter.com/search?q=' },
]

export default function Component() {
  const [selectedEngine, setSelectedEngine] = useState(searchEngines[0])
  const [searchQuery, setSearchQuery] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (textareaRef.current && !e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        textareaRef.current.focus()
        setSearchQuery(prev => prev + e.key)
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.open(selectedEngine.url + encodeURIComponent(searchQuery), '_blank')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-40 justify-between">
              {selectedEngine.name}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {searchEngines.map((engine) => (
              <DropdownMenuItem
                key={engine.name}
                onSelect={() => setSelectedEngine(engine)}
              >
                {engine.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Textarea
          ref={textareaRef}
          placeholder="Enter your search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full resize-y"
          style={{ minHeight: 'auto', height: 'auto', overflow: 'hidden' }}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${target.scrollHeight}px`
          }}
        />
      </div>
    </div>
  )
}