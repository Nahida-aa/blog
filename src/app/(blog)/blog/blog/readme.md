---
id:
title: blog
created_at: 2024-10-17T11:23:35Z
pushed_at: 
updated_at: 2024-10-17T11:23:35Z
authors:
  - name: aa
    github: Nahida-aa
    twitter: 
private: false
svg: 
image: 
tags: [weblog,next,mdx,tailwindcss]
description: blog with next+mdx+shadui
draft: false
---
## features
### file page
```tsx

```
### remote mdx metadata and content
### 及时 update and preview
- [x] 及时从文件系统获取 metadata and content, 保证从创建文件到预览文件都是最新的
- [ ] 在文件创建 在数据库中创建对应的记录
  - [ ] 在 文件移动时, 在数据库中 更改 file_path
### view_count
- [ ] 在文件被 view时, view_count + 1
  需要 id, 
