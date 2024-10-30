// src/app/.../_comp/reducer.ts
import { initialComments } from '../_mock/initComment'

export type Comment = {
  id: number;
  content: string;
  author: string;
  replies: Comment[];
}

export type Message = {
  id: number;
  content: string;
  author: string;
  comments: Comment[];
}

export type State = {
  messages: Message[];
  searchTerm: string;
}

export type Action =
  | { type: 'ADD_MESSAGE'; payload: { content: string; author: string } }
  | { type: 'ADD_COMMENT'; payload: { messageId: number; content: string; author: string } }
  | { type: 'ADD_REPLY'; payload: { messageId: number; commentId: number; content: string; author: string } }
  | { type: 'SET_SEARCH_TERM'; payload: string }

export const initialState: State = {
  messages: initialComments,
  searchTerm: '',
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { id: Date.now(), content: action.payload.content, author: action.payload.author, comments: [] }],
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        messages: state.messages.map(message =>
          message.id === action.payload.messageId
            ? { ...message, comments: [...message.comments, { id: Date.now(), content: action.payload.content, author: action.payload.author, replies: [] }] }
            : message
        ),
      }
    case 'ADD_REPLY':
      return {
        ...state,
        messages: state.messages.map(message =>
          message.id === action.payload.messageId
            ? {
                ...message,
                comments: message.comments.map(comment =>
                  comment.id === action.payload.commentId
                    ? { ...comment, replies: [...comment.replies, { id: Date.now(), content: action.payload.content, author: action.payload.author, replies: [] }] }
                    : comment
                )
              }
            : message
        ),
      }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    default:
      return state
  }
}