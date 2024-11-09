import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { MultiLanguageCodeBlock } from '@/components/md/pre/prismPre'

const FriendLinkTemplate: React.FC = () => {
  const templateInput = {
    name: "aa's blog",
    url: "https://blog.Nahida-aa.us.kg",
    avatar: "https://avatars.githubusercontent.com/u/96083926?v=4",
    desc: "变聪明啦"
  }
  const codeSnippets = [
    {
      language: 'yaml',
      value: `
name: ${templateInput.name} # site name or your name
url: ${templateInput.url} # site url
avatar: ${templateInput.avatar} # site avatar (or your avatar) url
desc: ${templateInput.desc} # site description
`.trim()
    },
    {
      language: 'md',
      value: `
name=${templateInput.name}
url=${templateInput.url}
avatar=${templateInput.avatar}
desc=${templateInput.desc}
`.trim()},
    { 
      language: 'json',
      value: JSON.stringify(templateInput, null, 2)
    }
  ]

  return (
    <Card className="flex-1 w-full">
      <CardContent className="p-4 ">
        <MultiLanguageCodeBlock codeSnippets={codeSnippets} title={"blogroll template"} />
      </CardContent>
    </Card>
  )
}

export default FriendLinkTemplate