// export type FetchFunction = typeof globalThis.fetch;
// import { useCallback, useEffect, useId, useRef, useState } from 'react';
// import type {
//   // Attachment,
//   // ChatRequest,
//   // ChatRequestOptions,
//   // CreateMessage,
//   // IdGenerator,
//   // JSONValue,
//   // Message,
//   UseChatOptions,
// } from './types';
// import { Attachment, ChatRequest, ChatRequestOptions, CreateMessage, IdGenerator, JSONValue } from 'ai';
// import useSWR, { KeyedMutator } from 'swr';
// import { UseChatHelpers } from 'ai/react';
// import { callChatApi } from '../lib/ai/packages/ui-utils/src/call-chat-api';
// import { generateId as generateIdFunc } from '../lib/ai/packages/provider-utils/src/generate-id'
// import { throttle } from '../lib/ai/packages/react/src/throttle';

// const processResponseStream = async (
//   api: string,
//   chatRequest: ChatRequest,
//   mutate: KeyedMutator<Message[]>,
//   mutateStreamData: KeyedMutator<JSONValue[] | undefined>,
//   existingDataRef: React.MutableRefObject<JSONValue[] | undefined>,
//   extraMetadataRef: React.MutableRefObject<any>,
//   messagesRef: React.MutableRefObject<Message[]>,
//   abortControllerRef: React.MutableRefObject<AbortController | null>,
//   generateId: IdGenerator,
//   streamProtocol: UseChatOptions['streamProtocol'],
//   onFinish: UseChatOptions['onFinish'],
//   onResponse: ((response: Response) => void | Promise<void>) | undefined,
//   onToolCall: UseChatOptions['onToolCall'] | undefined,
//   sendExtraMessageFields: boolean | undefined,
//   experimental_prepareRequestBody:
//     | ((options: {
//         messages: Message[];
//         requestData?: JSONValue;
//         requestBody?: object;
//       }) => JSONValue)
//     | undefined,
//   fetch: FetchFunction | undefined,
//   keepLastMessageOnError: boolean,
// ) => {
//   // Do an optimistic update to the chat state to show the updated messages immediately:
//   const previousMessages = messagesRef.current;
//   mutate(chatRequest.messages, false);

//   const constructedMessagesPayload = sendExtraMessageFields
//     ? chatRequest.messages
//     : chatRequest.messages.map(
//         ({
//           role,
//           content,
//           experimental_attachments,
//           data,
//           annotations,
//           toolInvocations,
//         }) => ({
//           role,
//           content,
//           ...(experimental_attachments !== undefined && {
//             experimental_attachments,
//           }),
//           ...(data !== undefined && { data }),
//           ...(annotations !== undefined && { annotations }),
//           ...(toolInvocations !== undefined && { toolInvocations }),
//         }),
//       );

//   const existingData = existingDataRef.current;

//   return await callChatApi({
//     api,
//     body: experimental_prepareRequestBody?.({
//       messages: chatRequest.messages,
//       requestData: chatRequest.data,
//       requestBody: chatRequest.body,
//     }) ?? {
//       messages: constructedMessagesPayload,
//       data: chatRequest.data,
//       ...extraMetadataRef.current.body,
//       ...chatRequest.body,
//     },
//     streamProtocol,
//     credentials: extraMetadataRef.current.credentials,
//     headers: {
//       ...extraMetadataRef.current.headers,
//       ...chatRequest.headers,
//     },
//     abortController: () => abortControllerRef.current,
//     restoreMessagesOnFailure() {
//       if (!keepLastMessageOnError) {
//         mutate(previousMessages, false);
//       }
//     },
//     onResponse,
//     onUpdate(merged, data) {
//       mutate([...chatRequest.messages, ...merged], false);
//       if (data?.length) {
//         mutateStreamData([...(existingData ?? []), ...data], false);
//       }
//     },
//     onToolCall,
//     onFinish,
//     generateId,
//     fetch,
//   });
// };

// export function useChat({
//   api = '/api/chat',
//   id,
//   initialMessages,
//   initialInput = '',
//   sendExtraMessageFields,
//   onToolCall,
//   experimental_prepareRequestBody,
//   maxSteps = 1,
//   streamProtocol = 'data',
//   onResponse,
//   onFinish,
//   onError,
//   credentials,
//   headers,
//   body,
//   generateId = generateIdFunc,
//   fetch,
//   keepLastMessageOnError = true,
//   experimental_throttle: throttleWaitMs,
// }: UseChatOptions & {
//   key?: string;

//   /**
//    * Experimental (React only). When a function is provided, it will be used
//    * to prepare the request body for the chat API. This can be useful for
//    * customizing the request body based on the messages and data in the chat.
//    *
//    * @param messages The current messages in the chat.
//    * @param requestData The data object passed in the chat request.
//    * @param requestBody The request body object passed in the chat request.
//    */
//   experimental_prepareRequestBody?: (options: {
//     messages: Message[];
//     requestData?: JSONValue;
//     requestBody?: object;
//   }) => JSONValue;

//   /**
// Custom throttle wait in ms for the chat messages and data updates.
// Default is undefined, which disables throttling.
//    */
//   experimental_throttle?: number;

//   /**
// Maximum number of sequential LLM calls (steps), e.g. when you use tool calls. Must be at least 1.

// A maximum number is required to prevent infinite loops in the case of misconfigured tools.

// By default, it's set to 1, which means that only a single LLM call is made.
//  */
//   maxSteps?: number;
// } = {}): UseChatHelpers & {
//   addToolResult: ({
//     toolCallId,
//     result,
//   }: {
//     toolCallId: string;
//     result: any;
//   }) => void;
// } {

//   // Generate a unique id for the chat if not provided.
//   const hookId = useId(); // 生成唯一的 ID。这个 ID 在组件的整个生命周期内保持不变
//   const idKey = id ?? hookId; // 如果 id 存在，则使用 id，否则使用 hookId。这确保了每个聊天会话都有一个唯一的标识符。
//   const chatKey = typeof api === 'string' ? [api, idKey] : idKey // 如果 api 是字符串，则将 api 和 idKey 组合成一个数组作为键；否则，直接使用 idKey 作为键。这用于在 SWR 中共享状态。

//   // Store a empty array as the initial messages
//   // (instead of using a default parameter value that gets re-created each time)
//   // to avoid re-renders:
//   const [initialMessagesFallback] = useState([]); // 初始化一个空数组作为初始消息状态的回退值。使用 useState 而不是直接赋值，可以避免在每次渲染时重新创建数组，从而避免不必要的重新渲染
//   // Store the chat state in SWR, using the chatId as the key to share states.
//   const { data: messages, mutate } = useSWR<Message[]>( // mutate：SWR 提供的函数，用于手动更新和重新验证数据。
//     [chatKey, 'messages'], // 作为键，
//     null, // 数据获取函数，这里为 null，表示不进行数据获取
//     { fallbackData: initialMessages ?? initialMessagesFallback },
//   );
//   // Keep the latest messages in a ref.
//   const messagesRef = useRef<Message[]>(messages || []); // useRef 创建一个可变的引用，用于存储最新的消息数据。初始值为 messages 或一个空数组
//   useEffect(() => { // 在 messages 变化时更新 messagesRef.current
//     messagesRef.current = messages || [];
//   }, [messages]);

//   // 通过SWR存储 流数据
//   // stream data
//   const { data: streamData, mutate: mutateStreamData } = useSWR<
//     JSONValue[] | undefined
//   >([chatKey, 'streamData'], null);
//   // 保持最新流数据的引用
//   // keep the latest stream data in a ref
//   const streamDataRef = useRef<JSONValue[] | undefined>(streamData);
//   useEffect(() => {
//     streamDataRef.current = streamData;
//   }, [streamData]);
//   // 我们存储 loading 状态在另一个hook中，以便在hook调用之间同步loading状态
//   // We store loading state in another hook to sync loading states across hook invocations
//   const { data: isLoading = false, mutate: mutateLoading } = useSWR<boolean>(
//     [chatKey, 'loading'],
//     null,
//   );
//   // 通过SWR存储错误
//   const { data: error = undefined, mutate: setError } = useSWR<
//     undefined | Error
//   >([chatKey, 'error'], null);
//   // `使停止` 控制器: 用于取消当前API调用
//   // Abort controller to cancel the current API call.
//   const abortControllerRef = useRef<AbortController | null>(null);

//   const extraMetadataRef = useRef({
//     credentials,
//     headers,
//     body,
//   });

//   useEffect(() => {
//     extraMetadataRef.current = {
//       credentials,
//       headers,
//       body,
//     };
//   }, [credentials, headers, body]);

//   // 用于触发 chat 请求: triggerRequest 是一个 async 函数(chatRequest)
//   const triggerRequest = useCallback(
//     async (chatRequest: ChatRequest) => {
//       const messageCount = messagesRef.current.length;

//       try {
//         mutateLoading(true); // 设置加载状态为 true
//         setError(undefined); // 清除之前的错误状态
//         const abortController = new AbortController(); // 创建一个新的 AbortController 实例，用于取消当前的 API 调用
//         abortControllerRef.current = abortController;
//         // 函数处理响应流
//         await processResponseStream(
//           api,
//           chatRequest,
//           // throttle streamed ui updates:
//           throttle(mutate, throttleWaitMs),
//           throttle(mutateStreamData, throttleWaitMs),
//           streamDataRef,
//           extraMetadataRef,
//           messagesRef,
//           abortControllerRef,
//           generateId,
//           streamProtocol,
//           onFinish,
//           onResponse,
//           onToolCall,
//           sendExtraMessageFields,
//           experimental_prepareRequestBody,
//           fetch,
//           keepLastMessageOnError,
//         );

//         abortControllerRef.current = null;
//       } catch (err) { // 在捕获块中处理错误：
//         // Ignore abort errors as they are expected.
//         if ((err as any).name === 'AbortError') { // 如果错误是 AbortError，则忽略它，因为这是预期的行为。
//           abortControllerRef.current = null;
//           return null;
//         }

//         if (onError && err instanceof Error) { 
//           onError(err);
//         } // 如果有 onError 回调函数，并且错误是 Error 实例，则调用 onError。

//         setError(err as Error); // 设置错误状态
//       } finally {
//         mutateLoading(false);
//       }

//       // auto-submit when all tool calls in the last assistant message have results:
//       const messages = messagesRef.current;
//       const lastMessage = messages[messages.length - 1];
//       if ( // 有新消息 && 有最后一条消息 && maxSteps > 1 && 下一步是可能的 && 没有到达限制步数 
//         // ensure we actually have new messages (to prevent infinite loops in case of errors):
//         messages.length > messageCount &&
//         // ensure there is a last message:
//         lastMessage != null &&
//         // check if the feature is enabled:
//         maxSteps > 1 &&
//         // check that next step is possible:
//         isAssistantMessageWithCompletedToolCalls(lastMessage) &&
//         // limit the number of automatic steps:
//         countTrailingAssistantMessages(messages) < maxSteps
//       ) {
//         await triggerRequest({ messages });
//       }
//     },
//     [
//       mutate,
//       mutateLoading,
//       api,
//       extraMetadataRef,
//       onResponse,
//       onFinish,
//       onError,
//       setError,
//       mutateStreamData,
//       streamDataRef,
//       streamProtocol,
//       sendExtraMessageFields,
//       experimental_prepareRequestBody,
//       onToolCall,
//       maxSteps,
//       messagesRef,
//       abortControllerRef,
//       generateId,
//       fetch,
//       keepLastMessageOnError,
//       throttleWaitMs,
//     ],
//   );
//   // 用于追加消息
//   const append = useCallback(
//     async (
//       message: Message | CreateMessage,
//       {
//         data,
//         headers,
//         body,
//         experimental_attachments,
//       }: ChatRequestOptions = {},
//     ) => {
//       if (!message.id) {
//         message.id = generateId();
//       }

//       const attachmentsForRequest = await prepareAttachmentsForRequest(
//         experimental_attachments,
//       );

//       const messages = messagesRef.current.concat({
//         ...message,
//         id: message.id ?? generateId(),
//         createdAt: message.createdAt ?? new Date(),
//         experimental_attachments:
//           attachmentsForRequest.length > 0 ? attachmentsForRequest : undefined,
//       });

//       return triggerRequest({ messages, headers, body, data });
//     },
//     [triggerRequest, generateId],
//   );
//   // 重新加载信息
//   const reload = useCallback(
//     async ({ data, headers, body }: ChatRequestOptions = {}) => {
//       const messages = messagesRef.current;

//       if (messages.length === 0) {
//         return null;
//       }

//       // Remove last assistant message and retry last user message.
//       const lastMessage = messages[messages.length - 1];
//       return triggerRequest({
//         messages:
//           lastMessage.role === 'assistant' ? messages.slice(0, -1) : messages,
//         headers,
//         body,
//         data,
//       });
//     },
//     [triggerRequest],
//   );
//   // 停止 chat 请求
//   const stop = useCallback(() => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//       abortControllerRef.current = null;
//     }
//   }, []);

//   const setMessages = useCallback(
//     (messages: Message[] | ((messages: Message[]) => Message[])) => {
//       if (typeof messages === 'function') {
//         messages = messages(messagesRef.current);
//       }

//       mutate(messages, false);
//       messagesRef.current = messages;
//     },
//     [mutate],
//   );

//   const setData = useCallback(
//     (
//       data:
//         | JSONValue[]
//         | undefined
//         | ((data: JSONValue[] | undefined) => JSONValue[] | undefined),
//     ) => {
//       if (typeof data === 'function') {
//         data = data(streamDataRef.current);
//       }

//       mutateStreamData(data, false);
//       streamDataRef.current = data;
//     },
//     [mutateStreamData],
//   );

//   // Input state and handlers.
//   const [input, setInput] = useState(initialInput);

//   const handleSubmit = useCallback(
//     async (
//       event?: { preventDefault?: () => void },
//       options: ChatRequestOptions = {},
//       metadata?: Object,
//     ) => {
//       event?.preventDefault?.();

//       if (!input && !options.allowEmptySubmit) return;

//       if (metadata) {
//         extraMetadataRef.current = {
//           ...extraMetadataRef.current,
//           ...metadata,
//         };
//       }

//       const attachmentsForRequest = await prepareAttachmentsForRequest(
//         options.experimental_attachments,
//       );

//       const messages =
//         !input && !attachmentsForRequest.length && options.allowEmptySubmit
//           ? messagesRef.current // 如果 input 为空，并且 attachmentsForRequest 为空，并且 options.allowEmptySubmit 为 true，则使用当前的消息数组 messagesRef.current
//           : messagesRef.current.concat({ // 否则，创建一个新的消息对象，并将其添加到当前的消息数组中
//               id: generateId(),
//               createdAt: new Date(),
//               role: 'user',
//               content: input,
//               experimental_attachments:
//                 attachmentsForRequest.length > 0
//                   ? attachmentsForRequest
//                   : undefined,
//             });

//       const chatRequest: ChatRequest = {
//         messages,
//         headers: options.headers,
//         body: options.body,
//         data: options.data,
//       };

//       triggerRequest(chatRequest);

//       setInput('');
//     },[input, generateId, triggerRequest],
//   );

//   const handleInputChange = (e: any) => {
//     setInput(e.target.value);
//   };

//   const addToolResult = ({
//     toolCallId,
//     result,
//   }: {
//     toolCallId: string;
//     result: any;
//   }) => {
//     const updatedMessages = messagesRef.current.map((message, index, arr) =>
//       // update the tool calls in the last assistant message:
//       index === arr.length - 1 &&
//       message.role === 'assistant' &&
//       message.toolInvocations
//         ? {
//             ...message,
//             toolInvocations: message.toolInvocations.map(toolInvocation =>
//               toolInvocation.toolCallId === toolCallId
//                 ? { ...toolInvocation, result }
//                 : toolInvocation,
//             ),
//           }
//         : message,
//     );

//     mutate(updatedMessages, false);

//     // auto-submit when all tool calls in the last assistant message have results:
//     const lastMessage = updatedMessages[updatedMessages.length - 1];
//     if (isAssistantMessageWithCompletedToolCalls(lastMessage)) {
//       triggerRequest({ messages: updatedMessages });
//     }
//   };

//   return {
//     messages: messages || [], // base
//     setMessages,
//     data: streamData,
//     setData,
//     error,
//     append,
//     reload,
//     stop,
//     input, // base
//     setInput,
//     handleInputChange, // base
//     handleSubmit, // base
//     isLoading, // base
//     addToolResult,
//   };
// }

// async function prepareAttachmentsForRequest(
//   attachmentsFromOptions: FileList | Array<Attachment> | undefined,
// ) {
//   if (attachmentsFromOptions == null) {
//     return [];
//   }

//   if (attachmentsFromOptions instanceof FileList) {
//     return Promise.all(
//       Array.from(attachmentsFromOptions).map(async attachment => {
//         const { name, type } = attachment;

//         const dataUrl = await new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = readerEvent => {
//             resolve(readerEvent.target?.result as string);
//           };
//           reader.onerror = error => reject(error);
//           reader.readAsDataURL(attachment);
//         });

//         return {
//           name,
//           contentType: type,
//           url: dataUrl,
//         };
//       }),
//     );
//   }

//   if (Array.isArray(attachmentsFromOptions)) {
//     return attachmentsFromOptions;
//   }

//   throw new Error('Invalid attachments type');
// }