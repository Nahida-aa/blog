import { notFound } from 'next/navigation'
// import { getBlogPosts } from '@/lib/mdx/utils'
import { baseUrl } from '@/lib/sitemap'
import BlogSidebar from './_components/BlogSidebar';
import Header from './_components/Header';
import MDX from './_components/MDX'; 
import BlogToc from './_components/BlogToc';
import { getRelatedPosts } from './func';
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
  };
}
export default function Blog({ params }: BlogPageProps) {
  const blog_path = params.slug.join('/');
  // console.log(blog_path)
  const { metadata, mdxContent } = getBlog(blog_path)
  // console.log(`metadata, mdxContent:${metadata}, ${mdxContent}`)
  console.log(metadata)
  const toc = getToc(blog_path)
  // console.log(toc[0])
  // const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!mdxContent){
    notFound()
  }
  // if (!post) {
  //   notFound()
  // }

  // 获取相关的文章和目录数据
  const relatedPosts = getRelatedPosts(blog_path)

  return (

    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData blog_path={blog_path} metadata={metadata}  baseUrl={baseUrl} />
        {/* 左侧：相关文章列表 */}
        <BlogSidebar relatedPosts={relatedPosts} />
        <div className='pb-10 flex-1 flex w-full'>
          <div className="w-full ">
            {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
            <Header blog_path={blog_path} />
            <div className='m-4'>
              {/* 时间等信息 */}
              <Info blog_path={blog_path} metadata={metadata} />

              <div className='flex w-full'>
                {/* 中间：文章header+content */}
                <MDX content={mdxContent} />
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