// src/app/.../_comp/AddCommentForm.tsx
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const AddCommentForm = ({ messageId, dispatch, username }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      dispatch({ type: 'ADD_COMMENT', payload: { messageId, content: comment, author: username } })
      setComment('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment"
        className="w-full"
      />
      <Button type="submit">Add Comment</Button>
    </form>
  )
}

export default AddCommentForm