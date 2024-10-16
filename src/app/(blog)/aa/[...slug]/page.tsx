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
  // const posts: Post[] = getBlogPosts()
  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))

  // const metadataTree = getMetadataTree();
  // // console.log(metadataTree)

  // const getPaths = (nodes: JsonDocMetadataTreeNode[]): string[] => {
  //   return nodes.flatMap((node) => {
  //     if (node.children.length > 0) {
  //       return getPaths(node.children);
  //     }
  //     return node.path.replace(/\.mdx?$/, '');
  //   });
  // };

  // const paths = getPaths(metadataTree).map((slug) => ({
  //   slug: slug.split('/'),
  // }));
  // return paths;
  
  const staticParamsFilePath = path.join(process.cwd(), 'public', 'data', 'staticParams.json');
  const staticParams = JSON.parse(fs.readFileSync(staticParamsFilePath, 'utf8'));
  // console.log(staticParams)
  return staticParams;
}

// export function generateMetadata({ params }: { params: { slug: string } }) {
//   const post = getBlogPosts().find((post) => post.slug === params.slug)
//   if (!post) {
//     return
//   }
//   const {
//     title,
//     pushed_at: pushed_atTime,
//     description: description,
//     image,
//   } = post.metadata
//   const ogImage = image
//     ? image
//     : `${baseUrl}/og?title=${encodeURIComponent(title)}`

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: 'article',
//       pushed_atTime,
//       url: `${baseUrl}/aa/${post.slug}`,
//       images: [
//         {
//           url: ogImage,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [ogImage],
//     },
//   }
// }

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


interface BlogPageProps {
  params: {
    slug: string[];
  },
  searchParams: {
    plain?: string
  }
}
export default function Blog({ params, searchParams }: BlogPageProps) {
  console.log(`searchParams: ${JSON.stringify(searchParams, null, 2)}`)
  const blog_path = params.slug.join('/');
  // console.log(blog_path)
  const { metadata, mdxContent } = getBlog(blog_path)
  // console.log(`metadata, mdxContent:${metadata}, ${mdxContent}`)
  // console.log(metadata)
  const toc = getToc(blog_path)
  // console.log(`toc: ${JSON.stringify(toc, null, 2)}`)
  // const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!mdxContent){
    notFound()
  }

  // 获取相关的文章和目录数据
  // const blogsMetaTreeData = getRelatedPosts(blog_path)
  const blogsMetaTreeData = getBlogsMetaTreeData()

  return (

    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData blog_path={blog_path} metadata={metadata}  baseUrl={baseUrl} />
        {/* 左侧：文件列表 */}
        <BlogSidebar PostTrees={blogsMetaTreeData} />
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