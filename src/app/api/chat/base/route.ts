import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    console.log(`src/app/api/chat/base/route.ts messages: ${JSON.stringify(messages)}`);

    const stream = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages
      ],
      model: modelName,
      stream: true
    });

    const encoder = new TextEncoder();

    let index = 0;
    const customReadable = new ReadableStream({
      async start(controller) {
        for await (const part of stream) {
          const content = part.choices[0]?.delta?.content || '';
          for (const char of content) {
            controller.enqueue(encoder.encode(`${index}:${JSON.stringify(char)}\n`));
            // index++;
          }
        }
        // Send finish message
        const finishMessage = {
          finishReason: "stop",
          usage: {
            promptTokens: 0,  // You may want to calculate these values
            completionTokens: 0
          },
          isContinued: false
        };
        controller.enqueue(encoder.encode(`e:${JSON.stringify(finishMessage)}\n`));
        controller.enqueue(encoder.encode(`d:${JSON.stringify(finishMessage)}\n`));
        controller.close();
      },
    });

    return new NextResponse(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("The API encountered an error:", error);
    return NextResponse.json({ error: "An error occurred during the request." }, { status: 500 });
  }
}