import { createOpenAI } from '@ai-sdk/openai'
const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const openai = createOpenAI({
  // custom settings, e.g.
  // compatibility: 'strict', // strict mode, enable when using the OpenAI API
  baseURL: endpoint, apiKey: token
});
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};
