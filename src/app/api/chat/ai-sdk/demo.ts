// import {
//   type Message,
//   StreamData,
//   convertToCoreMessages,
//   streamObject,
//   streamText,
// } from 'ai';
// import { customModel } from '@/app/chat/lib/ai'
// import { models } from '@/app/chat/lib/ai/models'
// import { systemPrompt } from '@/app/chat/lib/ai/prompts'
// import { z } from 'zod';
// type AllowedTools =
//   | 'createDocument'
//   | 'updateDocument'
//   | 'requestSuggestions'
//   | 'getWeather';

// const blocksTools: AllowedTools[] = [
//   'createDocument',
//   'updateDocument',
//   'requestSuggestions',
// ];

// const weatherTools: AllowedTools[] = ['getWeather'];
// const allTools: AllowedTools[] = [...blocksTools, ...weatherTools];

// export async function POST(request: Request) {
//   const {
//     id,
//     messages,
//     modelId,
//   }: { id: string; messages: Array<Message>; modelId: string } = await request.json()

//   const model = models.find((model) => model.id === modelId);
//   const coreMessages = convertToCoreMessages(messages);
//   const result = await streamText({
//     model: customModel(model.apiIdentifier),
//     system: systemPrompt,
//     messages: coreMessages,
//     maxSteps: 5,
//     experimental_activeTools: allTools,
//     tools: {
//       getWeather: {
//         description: 'Get the current weather at a location',
//         parameters: z.object({
//           latitude: z.number(),
//           longitude: z.number(),
//         }),
//         execute: async ({ latitude, longitude }) => {
//           const response = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
//           );

//           const weatherData = await response.json();
//           return weatherData;
//         },
//       },
//       createDocument: {
//         description: 'Create a document for a writing activity',
//         parameters: z.object({
//           title: z.string(),
//         }),
//         execute: async ({ title }) => {
//           const id = generateUUID();
//           let draftText = '';

//           streamingData.append({
//             type: 'id',
//             content: id,
//           });

//           streamingData.append({
//             type: 'title',
//             content: title,
//           });

//           streamingData.append({
//             type: 'clear',
//             content: '',
//           });

//           const { fullStream } = await streamText({
//             model: customModel(model.apiIdentifier),
//             system:
//               'Write about the given topic. Markdown is supported. Use headings wherever appropriate.',
//             prompt: title,
//           });

//           for await (const delta of fullStream) {
//             const { type } = delta;

//             if (type === 'text-delta') {
//               const { textDelta } = delta;

//               draftText += textDelta;
//               streamingData.append({
//                 type: 'text-delta',
//                 content: textDelta,
//               });
//             }
//           }

//           streamingData.append({ type: 'finish', content: '' });

//           if (session.user?.id) {
//             await saveDocument({
//               id,
//               title,
//               content: draftText,
//               userId: session.user.id,
//             });
//           }

//           return {
//             id,
//             title,
//             content: 'A document was created and is now visible to the user.',
//           };
//         },
//       },
//       updateDocument: {
//         description: 'Update a document with the given description',
//         parameters: z.object({
//           id: z.string().describe('The ID of the document to update'),
//           description: z
//             .string()
//             .describe('The description of changes that need to be made'),
//         }),
//         execute: async ({ id, description }) => {
//           const document = await getDocumentById({ id });

//           if (!document) {
//             return {
//               error: 'Document not found',
//             };
//           }

//           const { content: currentContent } = document;
//           let draftText = '';

//           streamingData.append({
//             type: 'clear',
//             content: document.title,
//           });

//           const { fullStream } = await streamText({
//             model: customModel(model.apiIdentifier),
//             system:
//               'You are a helpful writing assistant. Based on the description, please update the piece of writing.',
//             experimental_providerMetadata: {
//               openai: {
//                 prediction: {
//                   type: 'content',
//                   content: currentContent,
//                 },
//               },
//             },
//             messages: [
//               {
//                 role: 'user',
//                 content: description,
//               },
//               { role: 'user', content: currentContent },
//             ],
//           });

//           for await (const delta of fullStream) {
//             const { type } = delta;

//             if (type === 'text-delta') {
//               const { textDelta } = delta;

//               draftText += textDelta;
//               streamingData.append({
//                 type: 'text-delta',
//                 content: textDelta,
//               });
//             }
//           }

//           streamingData.append({ type: 'finish', content: '' });

//           if (session.user?.id) {
//             await saveDocument({
//               id,
//               title: document.title,
//               content: draftText,
//               userId: session.user.id,
//             });
//           }

//           return {
//             id,
//             title: document.title,
//             content: 'The document has been updated successfully.',
//           };
//         },
//       },
//       requestSuggestions: {
//         description: 'Request suggestions for a document',
//         parameters: z.object({
//           documentId: z
//             .string()
//             .describe('The ID of the document to request edits'),
//         }),
//         execute: async ({ documentId }) => {
//           const document = await getDocumentById({ id: documentId });

//           if (!document || !document.content) {
//             return {
//               error: 'Document not found',
//             };
//           }

//           const suggestions: Array<
//             Omit<Suggestion, 'userId' | 'createdAt' | 'documentCreatedAt'>
//           > = [];

//           const { elementStream } = await streamObject({
//             model: customModel(model.apiIdentifier),
//             system:
//               'You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.',
//             prompt: document.content,
//             output: 'array',
//             schema: z.object({
//               originalSentence: z.string().describe('The original sentence'),
//               suggestedSentence: z.string().describe('The suggested sentence'),
//               description: z
//                 .string()
//                 .describe('The description of the suggestion'),
//             }),
//           });

//           for await (const element of elementStream) {
//             const suggestion = {
//               originalText: element.originalSentence,
//               suggestedText: element.suggestedSentence,
//               description: element.description,
//               id: generateUUID(),
//               documentId: documentId,
//               isResolved: false,
//             };

//             streamingData.append({
//               type: 'suggestion',
//               content: suggestion,
//             });

//             suggestions.push(suggestion);
//           }

//           if (session.user?.id) {
//             const userId = session.user.id;

//             await saveSuggestions({
//               suggestions: suggestions.map((suggestion) => ({
//                 ...suggestion,
//                 userId,
//                 createdAt: new Date(),
//                 documentCreatedAt: document.createdAt,
//               })),
//             });
//           }

//           return {
//             id: documentId,
//             title: document.title,
//             message: 'Suggestions have been added to the document',
//           };
//         },
//       },
//     },
//     onFinish: async ({ responseMessages }) => {
//       if (session.user?.id) {
//         try {
//           const responseMessagesWithoutIncompleteToolCalls =
//             sanitizeResponseMessages(responseMessages);

//           await saveMessages({
//             messages: responseMessagesWithoutIncompleteToolCalls.map(
//               (message) => {
//                 const messageId = generateUUID();

//                 if (message.role === 'assistant') {
//                   streamingData.appendMessageAnnotation({
//                     messageIdFromServer: messageId,
//                   });
//                 }

//                 return {
//                   id: messageId,
//                   chatId: id,
//                   role: message.role,
//                   content: message.content,
//                   createdAt: new Date(),
//                 };
//               },
//             ),
//           });
//         } catch (error) {
//           console.error('Failed to save chat');
//         }
//       }

//       streamingData.close();
//     },
//     experimental_telemetry: {
//       isEnabled: true,
//       functionId: 'stream-text',
//     },
//   });

//   return result.toDataStreamResponse({
//     data: streamingData,
//   });
// }