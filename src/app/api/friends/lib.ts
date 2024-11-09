// const translations = {
//   en: {
//     lost: 'lost',
//     not_added: 'not added'
//   },
//   zh: {
//     lost: '失联',
//     not_added: '未添加'
//   }
// }

import {RestIssues_i} from '@/app/(blog)/blog/github/api/types/issues'
import { Friend} from '@/app/(blog)/blog/blog/types/friends'
const issue2friend = (issue: RestIssues_i): Friend | null => {
  try {
    const { number, title, body, labels: issue_labels, state } = issue;
    const nameMatch = body.match(/name: (.*)/);
    const urlMatch = body.match(/url: (.*)/);
    const avatarMatch = body.match(/avatar: (.*)/);
    const descriptionMatch = body.match(/desc: (.*)/);
    const filteredLabels = issue_labels
      .map((label: any) => label.name)
      .filter((name: string) => name === "lost" || name === "not added");

    return {
      id: number,
      name: nameMatch ? nameMatch[1] : title,
      url: urlMatch ? urlMatch[1] : '',
      avatar: avatarMatch ? avatarMatch[1] : '',
      description: descriptionMatch ? descriptionMatch[1] : '',
      labels: filteredLabels,
      state
    } as Friend
  } catch (error) {
    console.error('Error parsing issue:', error);
    return  {id: 0, name: '', url: '', avatar: '', description: '', labels: [], state: ''} as Friend
  }
}
const friend2issue = (friend: Friend, existingFriend?: Friend) => {
  const { id, title, name, url, avatar, description, labels, state } = friend;
  const body = `name: ${name || existingFriend?.name}\nurl: ${url || existingFriend?.url}\navatar: ${avatar || existingFriend?.avatar}\ndesc: ${description || existingFriend?.description}`
  return {
    number: id,
    title: title || name,
    body: body,
    labels: labels,
    state: state
  }
}
interface FetchOptions {
  searchParams?: {
    stat?: 'open' | 'closed' | 'all',
    [key: string]: string
  }
  method?: string
  body?: BodyInit | null
  issueNumber?: string
}
export const fetch_friends = async (fetch_options: FetchOptions) => {
  const { searchParams, method = 'GET', body, issueNumber } = fetch_options
  let url = `https://api.github.com/repos/Nahida-aa/friends/issues`
  if (issueNumber) {
    url = `https://api.github.com/repos/Nahida-aa/friends/issues/${issueNumber}`
  } else {
    const searchParamsString = new URLSearchParams(searchParams).toString()
    url = `${url}?${searchParamsString}`
  }
  const options: RequestInit = {
    method: method,
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }

  if (method === 'POST' || method === 'PATCH') {
    const friend = JSON.parse(body as string) as Friend;
    if (method === 'POST' && (!friend.name || !friend.url)) {
      throw new Error('name and url are required fields');
    }
    if (method === 'PATCH' && issueNumber) {
      const hasCompleteData = friend.name && friend.url && friend.avatar && friend.description;
      if (!hasCompleteData) {
        const existingFriend = await fetch_friends({ method: 'GET', issueNumber });
        // console.log('existingFriend:', existingFriend);
        options.body = JSON.stringify(friend2issue(friend, existingFriend));
      } else {
        options.body = JSON.stringify(friend2issue(friend));
      }
    } else {
      options.body = JSON.stringify(friend2issue(friend))
    }
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    let ret = data
    if (response.ok) {
      if (method === 'GET' && !issueNumber) {
        console.log('friends:list')
        ret = data.map((issue: RestIssues_i) => issue2friend(issue))
      } else {
        // 处理非 GET 请求的响应或 GET 请求单个对象的响应
        console.log('friends:item')
        ret = issue2friend(data)
      }
    }
    return ret
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    throw error;
  }
}