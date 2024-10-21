'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from 'lucide-react'
import { CodeHighlight} from '@/components/md/pre/prismPre'

interface ResponseType {
  status?: number;
  error?: string;
  headers?: Record<string, string>;
  body?: string;
}
export default function Component() {
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
    setIsLoading(true)
    try {
      const options = {
        method,
        headers: processedHeaders,
        body
      }

      if (method !== 'GET' && processedBody) {
        options.body = processedBody
      }

      const res = await fetch(processedUrl, options)
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

  const generateEquivalentCode = () => {
    const shCode = `curl -X ${method} ${Object.entries(processedHeaders).map(([k, v]) => `-H "${k}: ${v}"`).join(' ')} ${method !== 'GET' ? `-d '${processedBody}'` : ''} "${processedUrl}"`

    const jsCode = `fetch("${processedUrl}", {
  method: "${method}",
  headers: ${JSON.stringify(processedHeaders, null, 2)},
  ${method !== 'GET' ? `body: ${JSON.stringify(processedBody)}` : ''}
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`

    const tsCode = `async function sendRequest() {
  try {
    const response = await fetch("${processedUrl}", {
      method: "${method}",
      headers: ${JSON.stringify(processedHeaders, null, 2)},
      ${method !== 'GET' ? `body: ${JSON.stringify(processedBody)}` : ''}
    });
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendRequest();`

    const pythonCode = `import requests

response = requests.${method.toLowerCase()}("${processedUrl}",
    headers=${JSON.stringify(processedHeaders, null, 2)},
    ${method !== 'GET' ? `data='${processedBody}'` : ''}
)

print(response.text)`

    const cCode = `#include <stdio.h>
#include <curl/curl.h>

int main(void) {
  CURL *curl;
  CURLcode res;

  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_URL, "${processedUrl}");
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "${method}");

    struct curl_slist *headers = NULL;
    ${Object.entries(processedHeaders).map(([k, v]) => `headers = curl_slist_append(headers, "${k}: ${v}");`).join('\n    ')}
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

    ${method !== 'GET' ? `curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "${processedBody}");` : ''}

    res = curl_easy_perform(curl);
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));

    curl_easy_cleanup(curl);
    curl_slist_free_all(headers);
  }
  return 0;
}`

    const cppCode = `#include <iostream>
#include <string>
#include <curl/curl.h>

static size_t WriteCallback(void *contents, size_t size, size_t nmemb, void *userp)
{
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main(void)
{
    CURL *curl;
    CURLcode res;
    std::string readBuffer;

    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "${processedUrl}");
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "${method}");

        struct curl_slist *headers = NULL;
        ${Object.entries(processedHeaders).map(([k, v]) => `headers = curl_slist_append(headers, "${k}: ${v}");`).join('\n        ')}
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        ${method !== 'GET' ? `curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "${processedBody}");` : ''}

        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK)
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
        else
            std::cout << readBuffer << std::endl;

        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);
    }
    return 0;
}`

    const javaCode = `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiRequest {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("${processedUrl}"))
            .method("${method}", ${method !== 'GET' ? `HttpRequest.BodyPublishers.ofString("${processedBody}")` : 'HttpRequest.BodyPublishers.noBody()'})
            ${Object.entries(processedHeaders).map(([k, v]) => `.header("${k}", "${v}")`).join('\n            ')}
            .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`

    const restCode = `### Send ${method} request to ${processedUrl}
${method} ${processedUrl}
${Object.entries(processedHeaders).map(([k, v]) => `${k}: ${v}`).join('\n')}

${method !== 'GET' ? processedBody : ''}`

    const goCode = `package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "strings"
)

func main() {
    client := &http.Client{}
    req, err := http.NewRequest("${method}", "${processedUrl}", ${method !== 'GET' ? `strings.NewReader(\`${processedBody}\`)` : 'nil'})
    if err != nil {
        log.Fatal(err)
    }

    ${Object.entries(processedHeaders).map(([k, v]) => `req.Header.Set("${k}", "${v}")`).join('\n    ')}

    resp, err := client.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}`

    const rustCode = `use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let res = client.${method.toLowerCase()}("${processedUrl}")
        ${Object.entries(processedHeaders).map(([k, v]) => `.header("${k}", "${v}")`).join('\n        ')}
        ${method !== 'GET' ? `.body("${processedBody}")` : ''}
        .send()
        .await?;

    println!("{}", res.text().await?);
    Ok(())
}`

    return { shCode, jsCode, tsCode, pythonCode, cCode, cppCode, javaCode, restCode, goCode, rustCode }
  }

  const equivalentCode = generateEquivalentCode()

  return (
    <div className="container mx-auto p-4 max-w-3xl">
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
              <Tabs defaultValue="sh">
                <TabsList>
                  <TabsTrigger value="sh">Shell</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                  <TabsTrigger value="ts">TypeScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="c">C</TabsTrigger>
                  <TabsTrigger value="cpp">C++</TabsTrigger>
                  <TabsTrigger value="java">Java</TabsTrigger>
                  <TabsTrigger value="rest">REST</TabsTrigger>
                  <TabsTrigger value="go">Go</TabsTrigger>
                  <TabsTrigger value="rust">Rust</TabsTrigger>
                </TabsList>
                <TabsContent value="sh">
                  <CodeHighlight code={equivalentCode.shCode} language="bash" />
                </TabsContent>
                <TabsContent value="js">
                  <CodeHighlight code={equivalentCode.jsCode} language="javascript" />
                </TabsContent>
                <TabsContent value="ts">
                  <CodeHighlight code={equivalentCode.tsCode} language="typescript" />
                </TabsContent>
                <TabsContent value="python">
                  <CodeHighlight code={equivalentCode.pythonCode} language="python" />
                </TabsContent>
                <TabsContent value="c">
                  <CodeHighlight code={equivalentCode.cCode} language="c" />
                </TabsContent>
                <TabsContent value="cpp">
                  <CodeHighlight code={equivalentCode.cppCode} language="cpp" />
                </TabsContent>
                <TabsContent value="java">
                  <CodeHighlight code={equivalentCode.javaCode} language="java" />
                </TabsContent>
                <TabsContent value="rest">
                  <CodeHighlight code={equivalentCode.restCode} language="http" />
                </TabsContent>
                <TabsContent value="go">
                  <CodeHighlight code={equivalentCode.goCode} language="go" />
                </TabsContent>
                <TabsContent value="rust">
                  <CodeHighlight code={equivalentCode.rustCode} language="rust" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

