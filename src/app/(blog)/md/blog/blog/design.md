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
tags: [weblog,next,mdx,tailwindcss]
description: blog with next+mdx+shadui, 用类似 文件系统(tree)的方式管理 blog
draft: false
---
> Using App Router

## features
### user
#### prisma
```sh
pnpm install prisma --save-dev
pnpm prisma init
```
view:
```sh
...>pnpm prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```
说明:
- `pnpm prisma db pull`: db -> `[prisma/schema.prisma](prisma/schema.prisma)`
-  `pnpm prisma generate`: 生成 Prisma 客户端。生成后，你可以开始使用 Prisma 客户端查询你的数据库
- `pnpm prisma db push`: 将 Prisma schema 转换为数据库 schema
会得到:
```ini path='.env'
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
```prisma path='prisma/schema.prisma'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
##### 1. 连接数据库 and 生成 Prisma 客户端
```sh
修改 `DATABASE_URL` 为你的数据库连接字符串
```ini path='.env'
DATABASE_URL=""
```
```sh
pnpm prisma db pull
```
```prisma path='prisma/schema.prisma'
...
model User {
  id            String       @default(cuid()) @id
  name          String?
  email         String?   @unique
  created_at     DateTime  @default(now()) @map(name: "created_at")
  updated_at     DateTime  @updatedAt @map(name: "updated_at")
  @@map(name: "users")
}
model VisitorLog {
  id         Int      @id @default(autoincrement())
  ipAddress  String
  visitTime  DateTime @default(now())
  pageUrl    String
}
```
```sh
pnpm prisma db push
# pnpm prisma generate # 上面的命令会自动执行这个命令
```
##### 2. Using
```ts path='src/lib/db.ts'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient
}
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### file page
```tsx path="src/app/aa/[...slug]/page.tsx"
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
