// src/app/tools/api/_util/generateEquivalentCode.ts

export const generateEquivalentCode = (method: string, processedUrl: string, processedHeaders: Record<string, string>, processedBody: string) => {
  const shCode = `curl -X ${method} ${Object.entries(processedHeaders).map(([k, v]) => `-H "${k}: ${v}"`).join(' ')} ${method !== 'GET' ? `-d '${processedBody}'` : ''} "${processedUrl}"`;

  const jsCode = `fetch("${processedUrl}", {
  method: "${method}",
  headers: ${JSON.stringify(processedHeaders, null, 2)},
  ${method !== 'GET' ? `body: ${JSON.stringify(processedBody)}` : ''}
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

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

sendRequest();`;

  const pythonCode = `import requests

response = requests.${method.toLowerCase()}("${processedUrl}",
    headers=${JSON.stringify(processedHeaders, null, 2)},
    ${method !== 'GET' ? `data='${processedBody}'` : ''}
)

print(response.text)`;

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
}`;

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
}`;

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
}`;

  const restCode = `### Send ${method} request to ${processedUrl}
${method} ${processedUrl}
${Object.entries(processedHeaders).map(([k, v]) => `${k}: ${v}`).join('\n')}

${method !== 'GET' ? processedBody : ''}`;

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
}`;

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
}`;

  return { shCode, jsCode, tsCode, pythonCode, cCode, cppCode, javaCode, restCode, goCode, rustCode };
};