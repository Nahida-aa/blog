import { Owner } from './repos'

// https://api.github.com/users/Nahida-aa
type RestUsersUsername = Owner & {
  name: string // 昵称
  company: null;
  blog: string // blog_url
  location: null;
  email: null | string // no token: null
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
type RestUsersUsername_hasToken = RestUsersUsername & {
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  }
}
// https://api.github.com/user
type RestUser = RestUsersUsername_hasToken & {
  notification_email: string // 通知邮箱
}
const rest_user = {
  "login": "Nahida-aa",
  "id": 96083926,
  "node_id": "U_kgDOBbof1g",
  "avatar_url": "https://avatars.githubusercontent.com/u/96083926?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Nahida-aa",
  "html_url": "https://github.com/Nahida-aa",
  "followers_url": "https://api.github.com/users/Nahida-aa/followers",
  "following_url": "https://api.github.com/users/Nahida-aa/following{/other_user}",
  "gists_url": "https://api.github.com/users/Nahida-aa/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Nahida-aa/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Nahida-aa/subscriptions",
  "organizations_url": "https://api.github.com/users/Nahida-aa/orgs",
  "repos_url": "https://api.github.com/users/Nahida-aa/repos",
  "events_url": "https://api.github.com/users/Nahida-aa/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Nahida-aa/received_events",
  "type": "User",
  "user_view_type": "private",
  "site_admin": false,
  "name": "aa",
  "company": null,
  "blog": "https://Nahida-aa.github.io",
  "location": null,
  "email": "Nahida-aa@outlook.com",
  "hireable": null,
  "bio": "变聪明啦",
  "twitter_username": null,
  "notification_email": "Nahida-aa@outlook.com",
  "public_repos": 48,
  "public_gists": 0,
  "followers": 4,
  "following": 2,
  "created_at": "2021-12-13T20:11:19Z",
  "updated_at": "2024-10-23T17:09:53Z",
  "private_gists": 0,
  "total_private_repos": 7,
  "owned_private_repos": 7,
  "disk_usage": 264449,
  "collaborators": 0,
  "two_factor_authentication": false,
  "plan": {
    "name": "pro",
    "space": 976562499,
    "collaborators": 0,
    "private_repos": 9999
  }
}
type RestUser_noToken = {
  message: string
  documentation_url: string
  status: string
}
const restUser_noToken = {
  "message": "Requires authentication",
  "documentation_url": "https://docs.github.com/rest/users/users#get-the-authenticated-user",
  "status": "401"
}
type RestGithubUser = RestUsersUsername | RestUsersUsername_hasToken | RestUser_noToken