// import { getBlogPosts } from '@/lib/mdx/utils'

// export const baseUrl = process.env.NEXT_PUBLIC_URL

// export default async function sitemap() {
//   const blogs = getBlogPosts().map((post) => ({
//     url: `${baseUrl}/blog/${post.slug}`,
//     lastModified: post.metadata.pushed_at,
//   }))

//   const routes = ['', '/blog'].map((route) => ({
//     url: `${baseUrl}${route}`,
//     lastModified: new Date().toISOString().split('T')[0],
//   }))

//   return [...routes, ...blogs]
// }