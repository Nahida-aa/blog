---
title: database
created_at: 2024-10-17T14:42:09Z
pushed_at: 
updated_at: 2024-10-17T14:42:09Z
authors:
  - name: aa
    github: Nahida-aa
    twitter: 
private: false
svg: 
image: 
tags: [db]
description: 
draft: false
---
| name | Storage |  Compute  | Data transfer (Egress)  | written Data | dbs |
| --- | --- | --- | --- | --- | --- |
| vercel postgres| 256MB,+GB/$0.12 | 60(pro:100)h=t*0.25,+1h/$0.1, 因为一个数据库分配 0.25 个CPU | 256MB,+GB/$0.1 | 256MB,+GB/$0.096 | 1,+1/$1 |
| neon postgre | 0.5GB | 191.9h/月 | 5GB/月 | N/A | 10*10*500 |
## vercel
### vercel postgres

- **Vercel 的 PostgreSQL 服务**：Vercel 提供的 PostgreSQL 数据库服务是基于 Neon 的 PostgreSQL 实现的。
- **独立的数据库实例**：当你在 Vercel 的 Storage 界面创建数据库时，它会创建一个独立的数据库实例，而不是使用你在 Neon 上创建的数据库。
