import { customModel } from '@/app/chat/lib/ai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: customModel('gpt-4o'),
    messages,
  });

  return result.toDataStreamResponse();
}