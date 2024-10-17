---
title: blog with next+mdx+shadui
created_at: 2024-10-02
pushed_at: 2024-10-02
updated_at: 2024-10-14T01:50:25Z
description: 开发 blog with next+mdx+shadui, 
tags: [next, mdx, shadui]
---


## insatll dependencies
### h3
#### h4
##### h5
this is `行内代码`
###### h6
```sh
rm -rf node_modules package-lock.json pnpm-lock.yaml
pnpm install
pnpm update
pnpm dlx shadcn@latest add form
# Default, Slate
pnpm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
pnpm install next-mdx-remote
```

/next.config.mjs
```mjs
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
```

/src/mdx-components.tsx
```tsx
import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```