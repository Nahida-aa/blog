'use client'
import Giscus,{Mapping,Theme} from '@giscus/react';

export function GiscusGitHubDiscussions({ 
  mapping,
  term,
  category,
  categoryId,
  reactionsEnabled,
  theme = 'dark'
}: { 
  mapping: Mapping, // "pathname" | "number" | "url" | "title" | "og:title" | "specific"
  // mapping === "pathname" : giscus 将查找标题中包含页面 pathname 的 discussion
  // mapping === "url" : giscus 将查找标题中包含页面 URL 的 discussion
  // mapping === "title" : giscus 将查找标题中包含页面的 <title> 标签的 discussion
  // mapping === "og:title" : giscus 将查找标题中包含页面的 <meta property="og:title"> 标签的 discussion
  // mapping === "specific" : giscus 将查找标题中包含特定字符串的 discussion
  // mapping === "number" : giscus 将查找指定编号的 discussion
  term: string, // mapping==number 时 type = number2string
  category?: string, // 用于搜索前的过滤(mapping==number 时不支持)
  categoryId?: string, 
  strict?: '0' | '1', // mapping==number 时不支持
  reactionsEnabled?: '0' | '1',
  theme?: Theme // "preferred_color_scheme" | 'dark' | "light" | "custom_example.css"
}) {
  return (
    <Giscus
      id="comments"
      repo="Nahida-aa/blog"
      repoId="R_kgDOKfk2Uw"

      mapping={mapping}
      term={term}

      reactionsEnabled={reactionsEnabled}
      emitMetadata="1"
      inputPosition="top"
      loading="lazy"

      category={category}
      categoryId={categoryId}
      theme={theme}
      lang="zh-CN" // "en" | "zh-CN" | "zh-TW" | "zh-HK" | "zh-SG" | "zh-MY" ...
      // crossorigin="anonymous"
    />
  );
}
export default function Comments() {
  return (
      <GiscusGitHubDiscussions 
        mapping="number"
        term="4"
        reactionsEnabled="0"
        theme="dark"
      />
  )
}