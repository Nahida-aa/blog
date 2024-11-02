// src/pages/page.tsx
'use client'

import React, { useReducer, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { reducer, initialState, State, Action } from './_comp/reducer'
import AddCommentForm from './_comp/AddCommentForm'
import AddReplyForm from './_comp/AddReplyForm'
import { Card } from '@/components/ui/card'
import MessageGalaxyWithCtrl from './_comp/galaxy/MessageGalaxyWithCtrl'
// import type { Metadata } from 'next'

// export const metadata: Metadata = {title: 'Comment'}
export default function Component() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('Anonymous')

  const addMessage = () => {
    if (newMessage.trim()) {
      dispatch({ type: 'ADD_MESSAGE', payload: { content: newMessage, author: username } })
      setNewMessage('')
    }
  }

  const filteredMessages = state.messages.filter(message =>
    message.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    message.comments.some(comment => 
      comment.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      comment.replies.some(reply => reply.content.toLowerCase().includes(state.searchTerm.toLowerCase()))
    )
  )

  return (
    <div className={`min-h-screen `}>
      <div className="container mx-auto p-4  transition-colors duration-300">
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={state.searchTerm}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
              placeholder="Search messages and comments"
              className=" dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message"
              className="flex-grow dark:bg-gray-700 dark:text-white"
            />
            <Button onClick={addMessage} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              Add Message
            </Button>
          </div>
        </div>

        <MessageGalaxyWithCtrl messages={filteredMessages} />

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Messages and Comments</h2>
          <ScrollArea className="h-[400px]">
            {filteredMessages.map((message) => (
              <div key={message.id} className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow mb-4">
                <p className="dark:text-white mb-2"><strong>{message.author}:</strong> {message.content}</p>
                <div className="ml-4">
                  {message.comments.map((comment) => (
                    <div key={comment.id} className="mb-2">
                      <p className="dark:text-gray-300"><strong>{comment.author}:</strong> {comment.content}</p>
                      <div className="ml-4">
                        {comment.replies.map((reply) => (
                          <p key={reply.id} className="dark:text-gray-400"><strong>{reply.author}:</strong> {reply.content}</p>
                        ))}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="mt-1">
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reply to Comment</DialogTitle>
                          </DialogHeader>
                          <AddReplyForm messageId={message.id} commentId={comment.id} dispatch={dispatch} username={username} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add a Comment</DialogTitle>
                    </DialogHeader>
                    <AddCommentForm messageId={message.id} dispatch={dispatch} username={username} />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}