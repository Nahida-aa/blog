## GitHub Models OpenAI SDK

#### 1. Create a personal access token

#### 2. Install dependencies 
```json name="package.json"
{
  "type": "module",
  "dependencies": {
    "openai": "latest"
  }
}
```
#### 3. Run a basic code sample
This sample demonstrates a basic call to the chat completion API. It is leveraging the GitHub AI model inference endpoint and your GitHub token. The call is synchronous.
> 这个示例演示了对 chat completion API 的基本调用。它利用了 GitHub AI 模型推理端点和您的 GitHub 令牌。调用是同步的。
```js name="sample.js"
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "What is the capital of France?" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### 4. Explore more samples
##### Run a multi-turn conversation
> 运行多轮对话
This sample demonstrates a multi-turn conversation with the chat completion API. When using the model for a chat application, you'll need to manage the history of that conversation and send the latest messages to the model.
> 此示例演示了与 chat completion API 进行多轮对话。在使用模型进行聊天应用程序时，您需要管理该对话的历史记录，并将最新消息发送给模型。
```js name="multi-turn.js"
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
      { role: "assistant", content: "The capital of France is Paris." },
      { role: "user", content: "What about Spain?" }
      ],
      model: modelName
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```
##### Stream the output 
> 流式传输输出
For a better user experience, you will want to stream the response of the model so that the first token shows up early and you avoid waiting for long responses.
为了获得更好的用户体验，您需要流式传输模型的响应，以便第一个 token 尽早显示，并且避免等待长时间的响应。
```js name="stream.js"
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const stream = await client.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Give me 5 good reasons why I should exercise every day." },
      ],
      model: modelName,
      stream: true
    });

    for await (const part of stream) {
      process.stdout.write(part.choices[0]?.delta?.content || '');
    }
    process.stdout.write('\n');
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```
##### Chat with an image input
This model supports using images as inputs. To run a chat completion using a local image file, use the following sample.
> 此模型支持使用图像作为输入。要使用本地图像文件运行聊天完成，请使用以下示例。
```js name="image.js"
import OpenAI from "openai";
import fs from 'fs';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant that describes images in details." },
        { role: "user", content: [
            { type: "text", text: "What's in this image?"},
            { type: "image_url", image_url: {
                url: getImageDataUrl("sample.jpg", "jpg"), details: "low"}}
          ]
        }
      ],
      model: modelName
    });

  console.log(response.choices[0].message.content);
}

/**
 * Get the data URL of an image file.
 * @param {string} imageFile - The path to the image file.
 * @param {string} imageFormat - The format of the image file. For example: "jpeg", "png".
 * @returns {string} The data URL of the image.
 */
function getImageDataUrl(imageFile, imageFormat) {
  try {
      const imageBuffer = fs.readFileSync(imageFile);
      const imageBase64 = imageBuffer.toString('base64');
      return `data:image/${imageFormat};base64,${imageBase64}`;
  } catch (error) {
      console.error(`Could not read '${imageFile}'.`);
      console.error('Set the correct path to the image file before running this sample.');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```
##### Identify and invoke tools
> 识别和调用工具
A language model can be given a set of tools it can invoke, for running specific actions depending on the context of the conversation. This sample demonstrates how to define a function tool and how to act on a request from the model to invoke it.
> 语言模型可以给定一组工具，它可以调用这些工具，以根据对话的上下文运行特定操作。此示例演示了如何定义一个函数工具以及如何对模型的请求进行操作以调用它。
```js name="tools.js"
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

function getFlightInfo({originCity, destinationCity}){
  if (originCity === "Seattle" && destinationCity === "Miami"){
    return JSON.stringify({
      airline: "Delta",
      flight_number: "DL123",
      flight_date: "May 7th, 2024",
      flight_time: "10:00AM"
    });
  }
  return JSON.stringify({error: "No flights found between the cities"});
}

const namesToFunctions = {
  getFlightInfo: (data) =>
  getFlightInfo(data),
};

export async function main() {
  
  const tool = {
    "type": "function",
    "function": {
      name: "getFlightInfo",
      description: "Returns information about the next flight between two cities." +
              "This includes the name of the airline, flight number and the date and time" +
              "of the next flight",
      parameters: {
        "type": "object",
        "properties": {
          "originCity": {
            "type": "string",
            "description": "The name of the city where the flight originates",
          },
          "destinationCity": {
            "type": "string", 
            "description": "The flight destination city",
          },
        },
        "required": [
          "originCity",
          "destinationCity"
        ],
      }
    }
  };
  
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  
  let messages=[
      {role: "system", content: "You an assistant that helps users find flight information."},
      {role: "user", content: "I'm interested in going to Miami. What is the next flight there from Seattle?"},
  ];
  
  let response = await client.chat.completions.create({
    messages: messages,
    tools: [tool],
    model: modelName
  });
  
  // We expect the model to ask for a tool call
  if (response.choices[0].finish_reason === "tool_calls"){
  
    // Append the model response to the chat history
    messages.push(response.choices[0].message);

    // We expect a single tool call
    if (response.choices[0].message && response.choices[0].message.tool_calls.length === 1){

      const toolCall = response.choices[0].message.tool_calls[0];
      // We expect the tool to be a function call
      if (toolCall.type === "function"){
        const toolCall = response.choices[0].message.tool_calls[0];
        // Parse the function call arguments and call the function
        const functionArgs = JSON.parse(toolCall.function.arguments);
        console.log(`Calling function \`${toolCall.function.name}\` with arguments ${toolCall.function.arguments}`);
        const callableFunc = namesToFunctions[toolCall.function.name];
        const functionReturn = callableFunc(functionArgs);
        console.log(`Function returned = ${functionReturn}`);
      
        // Append the function call result fo the chat history
        messages.push(
          {
            "tool_call_id": toolCall.id,
            "role": "tool",
            "name": toolCall.function.name,
            "content": functionReturn,
          }
        )

        response = await client.chat.completions.create({
          messages: messages,
          tools: [tool],
          model: modelName
        });
      console.log(`Model response = ${response.choices[0].message.content}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```