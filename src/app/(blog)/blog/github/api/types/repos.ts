// GET https://api.github.com/users/{username}/repos
// RestGithubUser.repos_url = "https://api.github.com/users/Nahida-aa/repos"
type RestRepos_i = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string | null
  fork: boolean;
  url: string;
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number
  language: string // 主要语言(此 repo 中占比最大的语言)
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean // 是否归档
  disabled: boolean // 是否禁用
  open_issues_count: number;
  license: License | null
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  permissions?: RepoPermissions // has token
}
type RestRepos = RestRepos_i[]

// GET /repos/{owner}/{repo}
// https://api.github.com/repos/Nahida-aa/blog = RestRepos_i.url
export type Owner = {
  login: string // // 登记名 (用户名, owner 名称)
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string // 我目前是 ""
  url: string; // api/users/username
  html_url: string // github/username
  followers_url: string
  following_url: string
  gists_url: string // gist
  starred_url: string // star
  subscriptions_url: string // 订阅
  organizations_url: string // org
  repos_url: string // repos
  events_url: string
  received_events_url: string
  type: string // User | Organization
  user_view_type: string // no token: public | has token: private, 如何是在访问仓库(s)时:还是 public
  site_admin: boolean
}
type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
  node_id: string;
}
type RepoPermissions = {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
};
type Repo = RestRepos_i & {
  temp_clone_token: string;

  network_count: number;
  subscribers_count: number;


  // 合并策略
  allow_squash_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_rebase_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_update_branch?: boolean;
  use_squash_pr_title_as_default?: boolean;
  squash_merge_commit_message?: string;
  squash_merge_commit_title?: string;
  merge_commit_message?: string;
  merge_commit_title?: string;

  parent?: Repo
  source?: Repo
}