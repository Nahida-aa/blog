// 'use client'

// import { useState, useEffect, useRef, useCallback, useId } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useScrollToBottom } from '@/components/use-scroll-to-bottom'
// import { Overview } from '@/app/chat/_comp/overview'
// import { PreviewMessage, ThinkingMessage } from '../_comp/message'
// import useSWR, { useSWRConfig } from 'swr'
// import { useChat } from '../hook/useChatBase'

// const id = 'test'
// const api = '/api/chat/ai-sdk/base'
// const initialMessages = []

// export default function Chat() {
//   const { mutate } = useSWRConfig();
//   const {
//     messages,
//     setMessages,
//     handleSubmit,
//     input,
//     setInput,
//     handleInputChange,
//     append,
//     isLoading,
//     stop,
//     data: streamingData,
//   } = useChat({
//     api,
//     // body: { id, modelId: selectedModelId },
//     initialMessages,
//     // onFinish: () => {
//     //   mutate('/api/history');
//     // },
//   });

//   const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()

//   console.log(`src/app/chat/base/page.tsx messages: ${JSON.stringify(messages)}`)

//   return (
//     <div className="flex flex-col min-w-0 h-dvh">
//       <div
//         ref={messagesContainerRef}
//         className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
//       >
//         {messages.length === 0 && <Overview />}
//         {messages.map((message, index) => (
//           <PreviewMessage
//             key={message.id}
//             chatId={id}
//             message={message}
//             isLoading={isLoading && messages.length - 1 === index}
//           />
//         ))}

//         {isLoading &&
//           messages.length > 0 &&
//           messages[messages.length - 1].role === 'user' && (
//             <ThinkingMessage />
//         )}

//         <div
//           ref={messagesEndRef}
//           className="shrink-0 min-w-[24px] min-h-[24px]"
//         />
//       </div>
//       <form onSubmit={handleSubmit} className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
//         <Input
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Type your message..."
//           disabled={isLoading}
//         />
//         <Button type="submit" disabled={isLoading}>
//           Send
//         </Button>
//       </form>
//     </div>
//   )
// }