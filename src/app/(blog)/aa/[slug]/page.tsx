import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts } from '@/lib/mdx/utils'
import { baseUrl } from '@/lib/sitemap'
import { Card } from '@/components/ui/card';
import BlogSidebar from './_components/BlogSidebar';
import Header from './_components/Header';
import MDX from './_components/MDX'; 
import BlogToc from './_components/BlogToc';
import { getRelatedPosts, getToc } from './func';
import StructuredData from './_components/StructuredData';
// import { compileMDX } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/aa/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// export const getStaticProps = async ({ params }) => {
  // const { content, frontmatter } = await compileMDX({
  //   source: props.source, 
  //   options: options,
  //   components:{
  //     // ...MdxComponents, 
  //     ...(props.components || {}) }
  // })
  // console.log(content)

//   return {
//     props: {
//       content: content,
//       // frontMatter: data,
//     },
//   };
// };

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // 获取相关的文章和目录数据
  const relatedPosts = getRelatedPosts(params.slug);
  const toc = getToc(params.slug);

  return (

    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData post={post} baseUrl={baseUrl} />
        {/* 左侧：相关文章列表 */}
        <BlogSidebar relatedPosts={relatedPosts} />
        <div className='pb-10 flex-1 flex'>
          <div className="w-full ">
            {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
            <Header slug={post.slug} />
            <div className='m-4'>
              {/* 时间等信息 */}
              <Card className="mb-4">
                <h1 className="title font-semibold text-2xl tracking-tighter">
                  {post.metadata.title}
                </h1>
                <div className="flex justify-between items-center  text-sm">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </div>
              </Card>

              <div className='flex'>
                {/* 中间：文章header+content */}
                <MDX post={post} />
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