---
id:
title: blog design
created_at: 2024-10-17T12:38:26Z
pushed_at: 
updated_at: 2024-10-17T12:38:26Z
authors:
  - name: aa
    github: Nahida-aa
    twitter: 
private: false
svg: 
image:  
tags: [next,tailwindcss]
description: with next+shadui
draft: false
---
> Using App Router

## config page
```tsx path="src/app/config/page.tsx"
```

## user

## file page
```tsx path="src/app/[...slug]/page.tsx"
import { notFound } from 'next/navigation'
// import { getBlogPosts } from '@/lib/mdx/utils'
import { baseUrl } from '@/lib/sitemap'
import BlogSidebar from './_components/Sidebar';
import Header from './_components/Header';
import MDX from './_components/MDX'; 
import BlogToc from './_components/BlogToc';
import { 
  // getRelatedPosts,
  getBlogsMetaTreeData } from './func';
import StructuredData from './_components/StructuredData'
// import { compileMDX } from 'next-mdx-remote/rsc';
// import { Post, JsonDocMetadataTreeNode } from '@/types/mdx';
import Info from './_components/Info';
import { getBlog,getToc } from '@/lib/mdx/get';
import path from 'path';
import fs from 'fs';

export async function generateStaticParams() {
  const staticParamsFilePath = path.join(process.cwd(), 'public', 'data', 'staticParams.json');
  const staticParams = JSON.parse(fs.readFileSync(staticParamsFilePath, 'utf8'));
  return staticParams
}

interface BlogPageProps {
  params: {
    slug: string[];
  },
  searchParams: {
    plain?: string
  }
}
export default function FilePage({ params, searchParams }: BlogPageProps) {
  const slug_path = params.slug.join('/') // 'aa/bb/cc.mdx'
  const { metadata, content } = getFile(slug_path)
  const toc = getToc(slug_path)

  if (mdxContent==null){
    notFound()
  }
  const filesMeta = getFilesMetaTreeData()

  return (

    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData slug_path={slug_path} metadata={metadata}  baseUrl={baseUrl} />
        {/* 左侧：文件列表 */}
        <BlogSidebar filesMeta={filesMeta} />
        {/* 右侧 内容等 */}
        <div className='pb-10 flex-1 flex w-[calc(100%-var(--sidebar-width)-1px)]'>
          <div className="w-full ">
            {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
            <Header url_path={`aa/${blog_path}`} />
            <div className='m-4 max-w-full'>
              {/* 时间等信息 */}
              <Info url_path={`aa/blog_path`} metadata={metadata} />

              <div className='flex w-full'>
                {/* 中间：文章header+content */}
                <MDX content={mdxContent} searchParams={searchParams} />
                {/* 右侧：文章内部大纲 */}
                <BlogToc toc={toc} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```
### remote mdx metadata and content
### 及时 update and preview
- [x] 及时从文件系统获取 metadata and content, 保证从创建文件到预览文件都是最新的
- [ ] 在文件创建 在数据库中创建对应的记录
  - [ ] 在 文件移动时, 在数据库中 更改 file_path
### view_count
- [ ] 在文件被 view时, view_count + 1
  需要 id,
# blog with next+mdx+shadui
## design
### blog page
```
<h3 style={{backgroundColor: 'violet', padding: '1rem'}}>
你好`h3`
</h3>
```
```tsx

```

### blogs tree (files-tree, sidebar)
开发时从文件系统获得 metadata tree
生产时从 从 `public/metadata.json` 获取
### blog header
### mdx metadata
### mdx content
.md -(remark)-> AST -(rehype)-> .html
### mdx content toc (toc-tree)

### 从文件系统获取 metadata and content
这样可以保证一边写一边预览,
### view_count
### 
## google analytics
```sh
pnpm i @next/third-parties
```
```tsx path='src/app/layout.tsx'
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"

export default function Layout({ children }) {
  return (
    <html>
      <body>
        ...
        {children}
        ...
      {process.env.GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />}
      </body>
    </html>
  )
}
```
