// src/app/.../initialComments.ts
import { Message } from '../_comp/reducer'

export const initialComments: Message[] = [
  {
    id: 1,
    content: 'This is the first message',
    author: 'User1',
    comments: [
      {
        id: 1,
        content: 'This is a comment on the first message',
        author: 'User2',
        replies: [
          {
            id: 1,
            content: 'This is a reply to the comment',
            author: 'User3',
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    content: 'This is the second message',
    author: 'User4',
    comments: [
      {
        id: 2,
        content: 'This is a comment on the second message',
        author: 'User5',
        replies: []
      }
    ]
  }
]