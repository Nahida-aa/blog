// https://api.github.com/repos/Nahida-aa/blog/issues?state=all

import { Owner } from "./repos"

export type RestIssues_i = {
  url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3
  repository_url: string // https://api.github.com/repos/Nahida-aa/blog
  labels_url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3/labels{/name}
  comments_url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3/comments
  events_url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3/events
  html_url: string // https://github.com/Nahida-aa/blog/issues/3
  id: number // 1940665859
  node_id: string // I_kwDOKfk2U85zrDYD
  number: number // 3
  title: string // "test"
  user: Owner
  labels: Label[]
  state: string // open | closed
  locked: boolean
  assignee: null | Owner
  assignees: [null] | Owner[]
  milestone: null | Milestone
  comments: number
  created_at: string // "2021-08-03T02:41:44Z"
  updated_at: string // "2021-08-03T02:41:44Z"
  closed_at: null | string
  author_association: string // "OWNER"
  active_lock_reason: null
  body: string // .md
  closed_by: null | Owner
  reactions: {
    url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3/reactions
    total_count: number // 0
    '+1': number // 0
    '-1': number // 0
    laugh: number // 0
    hooray: number // 0
    confused: number // 0
    heart: number // 0
    rocket: number // 0
    eyes: number
  }
  timeline_url: string // https://api.github.com/repos/Nahida-aa/blog/issues/3/timeline
  performed_via_github_app: null
  state_reason: null
}
export type RestIssues = RestIssues_i[]
type Label = {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}
type Milestone = {
  url: string
  html_url: string
  labels_url: string
  id: number
  node_id: string
  number: number
  title: string
  description: string
  creator: Owner
  open_issues: number
  closed_issues: number
  state: string
  created_at: string
  updated_at: string
  due_on: string
  closed_at: string
}
