'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from 'lucide-react'
import { generateEquivalentCode } from './_utils/generateEquivalentCode'
import { EquivalentCode } from './_components/EquivalentCode'
interface ResponseType {
  status?: number;
  error?: string;
  headers?: Record<string, string>;
  body?: string;
}

export default function ToolsApiPage() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')
  const [variables, setVariables] = useState('')
  const [response, setResponse] = useState<ResponseType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [processedUrl, setProcessedUrl] = useState('')
  const [processedHeaders, setProcessedHeaders] = useState({})
  const [processedBody, setProcessedBody] = useState('')

  useEffect(() => {
    const vars = variables.split('\n').reduce((acc: { [key: string]: string }, line) => {
      const [key, value] = line.split('=');
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {});

    let newUrl = url
    let newHeaders: { [key: string]: string } = {};
    let newBody = body

    Object.entries(vars).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      newUrl = newUrl.replace(regex, value)
      newBody = newBody.replace(regex, value)
    })

    headers.split('\n').forEach(line => {
      const [key, value] = line.split(':')
      if (key && value) {
        let processedValue = value.trim()
        Object.entries(vars).forEach(([varKey, varValue]) => {
          const regex = new RegExp(`{{${varKey}}}`, 'g')
          processedValue = processedValue.replace(regex, varValue)
        })
        newHeaders[key.trim()] = processedValue
      }
    })

    setProcessedUrl(newUrl)
    setProcessedHeaders(newHeaders)
    setProcessedBody(newBody)
  }, [url, headers, body, variables])

  const sendRequest = async () => {
    console.log('click:sendRequest')
    setIsLoading(true)
    try {
      const options = {
        method,
        headers: processedHeaders,
      }

      if (method !== 'GET' && processedBody) {
        (options as RequestInit & { body: string }).body = processedBody
      }
      console.log('fetch前', options)
      const res = await fetch(processedUrl, options)
      console.log(`fetch后: ${res}`)
      const responseBody = await res.text()
      setResponse({
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: responseBody,
      })
    } catch (error: any) {
      setResponse({
        error: error.message,
      })
    }
    setIsLoading(false)
  }

  const equivalentCode = generateEquivalentCode(method, processedUrl, processedHeaders, processedBody)

  return (
    <div className="container mx-auto ">
      <Card>
        <CardHeader>
          <CardTitle>Advanced API Tester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter API URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
              />
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Enter variables (one per line, e.g. base_url=https://api.example.com)"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
            />
            <Textarea
              placeholder="Enter headers (one per line, e.g. Content-Type: application/json)"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
            />
            {method !== 'GET' && (
              <Textarea
                placeholder="Enter request body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
              />
            )}
            <Button onClick={sendRequest} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
          {response && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Status:</strong> {response.status}</p>
                  {response.error && <p className="text-red-500">{response.error}</p>}
                  {response.headers && (
                    <div className="relative group">
                      <strong>Headers:</strong>
                      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(response.headers, null, 2)}</pre>
                      <Button
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        variant="ghost"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(response.headers, null, 2))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {response.body && (
                    <div className="relative group">
                      <strong>Body:</strong>
                      <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">{response.body}</pre>
                      <Button
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        variant="ghost"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(response.body!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Equivalent Code</CardTitle>
            </CardHeader>
            <CardContent>
              <EquivalentCode equivalentCode={equivalentCode} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}