// import { notFound } from 'next/navigation'
// import { getBlogPosts } from '@/lib/mdx/utils'
// import { baseUrl } from '@/lib/sitemap'
import BlogSidebar from './[...slug]/_components/Sidebar';
import Header from './[...slug]/_components/Header';
// import MDX from './[...slug]/_components/MDX'; 
// import BlogToc from './[...slug]/_components/BlogToc';
import { blogsMetaTreeData } from './[...slug]/func';
// import StructuredData from './[...slug]/_components/StructuredData'
// import { compileMDX } from 'next-mdx-remote/rsc';
// import { Post, JsonDocMetadataTreeNode } from '@/types/mdx';
import Info from './[...slug]/_components/Info';
// import { getBlog,getToc } from '@/lib/mdx/get';


// export async function generateStaticParams() {
// // 静态路由: 自动生成了，不用手动添加
// }


export default function BlogList() {
  // console.log(blog_path)
  // console.log(`metadata, mdxContent:${metadata}, ${mdxContent}`)
  // console.log(metadata)
  // console.log(toc[0])
  // const post = getBlogPosts().find((post) => post.slug === params.slug)

  // if (!post) {
  //   notFound()
  // }


  return (
    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        {/* <StructuredData blog_path={"aa"} metadata={"aa"}  baseUrl={baseUrl} /> */}
        {/* 左侧：文章目录tree */}
        <BlogSidebar PostTrees={blogsMetaTreeData} />
        <div className='pb-10 flex-1 flex w-full'>
          <div className="w-full ">
            {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
            <Header url_path={'aa'} />
            <div className='m-4'>
              {/* 时间等信息 */}
              {/* <Info url_path={'aa'} metadata={metadata} /> */}

              <div className='flex w-full'>
                {/* 中间：文章header+content */}
                {/* <MDX content={mdxContent} /> */}
                {/* 右侧：文章内部大纲 */}
                {/* <BlogToc toc={toc} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}