// import { CoreToolCall, LanguageModelUsage } from "ai";
// import { FetchFunction } from "./useChat";
// import { IdGenerator } from "../lib/ai/packages/ui-utils/src/types";

// export type UseChatOptions = {
//   /**
// Keeps the last message when an error happens. Defaults to `true`.

// @deprecated This option will be removed in the next major release.
//    */
//   keepLastMessageOnError?: boolean;

//   /**
//    * The API endpoint that accepts a `{ messages: Message[] }` object and returns
//    * a stream of tokens of the AI chat response. Defaults to `/api/chat`.
//    */
//   api?: string;

//   /**
//    * A unique identifier for the chat. If not provided, a random one will be
//    * generated. When provided, the `useChat` hook with the same `id` will
//    * have shared states across components.
//    */
//   id?: string;

//   /**
//    * Initial messages of the chat. Useful to load an existing chat history.
//    */
//   initialMessages?: Message[];

//   /**
//    * Initial input of the chat.
//    */
//   initialInput?: string;

//   /**
// Optional callback function that is invoked when a tool call is received.
// Intended for automatic client-side tool execution.

// You can optionally return a result for the tool call,
// either synchronously or asynchronously.
//    */
//   onToolCall?: ({
//     toolCall,
//   }: {
//     toolCall: CoreToolCall<string, unknown>;
//   }) => void | Promise<unknown> | unknown;

//   /**
//    * Callback function to be called when the API response is received.
//    */
//   onResponse?: (response: Response) => void | Promise<void>;

//   /**
//    * Optional callback function that is called when the assistant message is finished streaming.
//    *
//    * @param message The message that was streamed.
//    * @param options.usage The token usage of the message.
//    * @param options.finishReason The finish reason of the message.
//    */
//   onFinish?: (
//     message: Message,
//     options: {
//       usage: LanguageModelUsage;
//       // finishReason: LanguageModelV1FinishReason;
//     },
//   ) => void;

//   /**
//    * Callback function to be called when an error is encountered.
//    */
//   onError?: (error: Error) => void;

//   /**
//    * A way to provide a function that is going to be used for ids for messages.
//    * If not provided the default AI SDK `generateId` is used.
//    */
//   generateId?: IdGenerator;

//   /**
//    * The credentials mode to be used for the fetch request.
//    * Possible values are: 'omit', 'same-origin', 'include'.
//    * Defaults to 'same-origin'.
//    */
//   credentials?: RequestCredentials;

//   /**
//    * HTTP headers to be sent with the API request.
//    */
//   headers?: Record<string, string> | Headers;

//   /**
//    * Extra body object to be sent with the API request.
//    * @example
//    * Send a `sessionId` to the API along with the messages.
//    * ```js
//    * useChat({
//    *   body: {
//    *     sessionId: '123',
//    *   }
//    * })
//    * ```
//    */
//   body?: object;

//   /**
//    * Whether to send extra message fields such as `message.id` and `message.createdAt` to the API.
//    * Defaults to `false`. When set to `true`, the API endpoint might need to
//    * handle the extra fields before forwarding the request to the AI service.
//    */
//   sendExtraMessageFields?: boolean;

//   /**
// Streaming protocol that is used. Defaults to `data`.
//    */
//   streamProtocol?: 'data' | 'text';

//   /**
// Custom fetch implementation. You can use it as a middleware to intercept requests,
// or to provide a custom fetch implementation for e.g. testing.
//     */
//   fetch?: FetchFunction;
// };
