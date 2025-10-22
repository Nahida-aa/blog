'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const encodingMethods = [
  { value: 'base64', label: 'Base64' },
  { value: 'uri', label: 'URI' },
  { value: 'hex', label: 'Hexadecimal' },
  { value: 'binary', label: 'Binary' },
  { value: 'ascii', label: 'ASCII' },
  { value: 'rot13', label: 'ROT13' },
  { value: 'morse', label: 'Morse Code' },
]

const morseCode: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
}

export default function Component() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [method, setMethod] = useState('base64')
  const [mode, setMode] = useState('encode')

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encode(input, method))
      } else {
        setOutput(decode(input, method))
      }
    } catch (error) {
      setOutput('Error: Invalid input for selected method')
    }
  }

  const encode = (str: string, method: string): string => {
    switch (method) {
      case 'base64':
        return btoa(str)
      case 'uri':
        return encodeURIComponent(str)
      case 'hex':
        return Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
      case 'binary':
        return Array.from(str).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
      case 'ascii':
        return Array.from(str).map(c => c.charCodeAt(0)).join(' ')
      case 'rot13':
        return str.replace(/[a-zA-Z]/g, c => {
          const charCode = (c as string).charCodeAt(0)
          return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (charCode + 13) ? charCode + 13 : charCode - 13)
        })
      case 'morse':
        return str.toUpperCase().split('').map(c => morseCode[c] || '').join(' ')
      default:
        return str
    }
  }

  const decode = (str: string, method: string): string => {
    switch (method) {
      case 'base64':
        return atob(str)
      case 'uri':
        return decodeURIComponent(str)
      case 'hex':
        return str.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || ''
      case 'binary':
        return str.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('')
      case 'ascii':
        return str.split(' ').map(code => String.fromCharCode(parseInt(code))).join('')
        case 'rot13':
          return str.replace(/[a-zA-Z]/g, c => {
            const charCode = c.charCodeAt(0)
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= charCode + 13 ? charCode + 13 : charCode - 13)
          })
      case 'morse':
        const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]))
        return str.split(' ').map(code => reverseMorse[code] || '').join('')
      default:
        return str
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Encoding/Decoding Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              placeholder="Enter text to encode/decode"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="method">Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {encodingMethods.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Mode</Label>
              <RadioGroup defaultValue="encode" onValueChange={setMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="encode" id="encode" />
                  <Label htmlFor="encode">Encode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decode" id="decode" />
                  <Label htmlFor="decode">Decode</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button onClick={handleProcess}>Process</Button>
          <div>
            <Label htmlFor="output">Output</Label>
            <Textarea
              id="output"
              placeholder="Result will appear here"
              value={output}
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}