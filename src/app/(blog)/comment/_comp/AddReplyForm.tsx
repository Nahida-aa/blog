// src/app/.../_comp/AddReplyForm.tsx
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const AddReplyForm = ({ messageId, commentId, dispatch, username }) => {
  const [reply, setReply] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (reply.trim()) {
      dispatch({ type: 'ADD_REPLY', payload: { messageId, commentId, content: reply, author: username } })
      setReply('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Enter your reply"
        className="w-full"
      />
      <Button type="submit">Add Reply</Button>
    </form>
  )
}

export default AddReplyForm