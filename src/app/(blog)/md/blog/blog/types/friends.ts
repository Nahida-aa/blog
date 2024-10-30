// src/app/(blog)/md/blog/blog/types/friends.ts
export type Friend = {
  id: number
  title?: string

  name: string
  url: string
  avatar: string
  description: string

  labels?: string[] // [lost, not added]

  state?: string // open | closed
}