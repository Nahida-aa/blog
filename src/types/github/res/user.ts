// 定义 GitHub 用户的接口
interface GitHubUser {
  login: string; // 登记名 (用户名, owner 名称)
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string; // 获取 此 json 的 url
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string; // 用户类型: User | Organization
  user_view_type: string; 
  site_admin: boolean;
  name: string; // 昵称
  company: string | null;
  blog: string; // 博客地址
  location: string | null;
  email: string; // 邮箱地址
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  notification_email: string; // 通知邮箱
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
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
  };
}