import { notFound } from 'next/navigation'
// import { getBlogPosts } from '@/lib/mdx/utils'
import { baseUrl } from '@/lib/sitemap'
import BlogSidebar from './_components/Sidebar';
import Header from './_components/Header';
import MDX from './_components/MDX'; 
import BlogToc from './_components/BlogToc';
import { 
  // getRelatedPosts,
  getFilesMetaTreeData } from './func';
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

interface FilePageProps {
  params: {
    slug: string[]
  },
  searchParams: {
    plain?: string
  }
}
export default function FilePage({ params, searchParams }: FilePageProps) {
  console.log(`searchParams: ${JSON.stringify({ params, searchParams }, null, 2)}`)
  const file_path = params.slug.join('/');
  // console.log(blog_path)
  const { metadata, mdxContent } = getBlog(file_path)
  // console.log(`metadata, mdxContent:${JSON.stringify({ metadata, mdxContent }, null, 2)}`)
  // console.log(metadata)
  const toc = getToc(file_path)

  if (mdxContent==null){
    notFound()
  }

  // 获取相关的files和目录数据
  const filesMeta = getFilesMetaTreeData()

  return (

    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData file_path={file_path} metadata={metadata}  baseUrl={baseUrl} />
        {/* 左侧：文件列表 */}
        <BlogSidebar filesMeta={filesMeta} />
        {/* 右侧 内容等 */}
        <div className='pb-10 flex-1 flex w-[calc(100%-var(--sidebar-width)-1px)]'>
          <div className="w-full ">
            {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
            <Header url_path={`aa/${file_path}`} />
            <div className='m-4 max-w-full'>
              {/* 时间等信息 */}
              <Info url_path={`aa/${file_path}`} metadata={metadata} />

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