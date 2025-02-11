import { notFound } from 'next/navigation'
import { baseUrl } from '@/lib/sitemap'
import FileSidebar from './_components/Sidebar';
import Header from './_components/Header';
import MDX from './_components/MDX'
import FileToc from './_components/FileToc'
import { 
  // getRelatedPosts,
  getFilesMetaTreeData } from './func';
import StructuredData from './_components/StructuredData'
import Info from './_components/Info';
import { getFile,getToc } from '@/lib/mdx/get';
import path from 'path';
import fs from 'fs'

import PasswordPrompt from './_components/PasswordPrompt'
import { cookies,headers  } from 'next/headers'

export async function generateMetadata(props) {
  const params = await props.params;
  // console.log(`params:`,JSON.stringify(params, null, 2))
  return {
    title: `aa/${decodeURI(params.slug.join('/'))}`
  }
}

export async function generateStaticParams() {
  
  const staticParamsFilePath = path.join(process.cwd(), 'public', 'data', 'staticParams.json');
  const staticParams = JSON.parse(fs.readFileSync(staticParamsFilePath, 'utf8'));
  return staticParams
}

interface FilePageProps {
  params: Promise<{
    slug: string[]
  }>,
  searchParams: Promise<{
    plain?: string
  }>
}
export default async function FilePage(props: FilePageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  // console.log(`params: ${JSON.stringify({ params, searchParams }, null, 2)}`)
  // const headersList =  headers()
  // const headerKeys = headersList.keys()
  // console.log(`src/app/(blog)/aa/[...slug]/page.tsx headersList: ${headersList}`)
  // console.log(`src/app/(blog)/aa/[...slug]/page.tsx headerKeys: ${JSON.stringify(headerKeys, null, 2)}`)
  // const headerEntries = []
  // headersList.forEach((value, key) => {
  //   headerEntries.push(`${key}: ${value}`)
  // })
  // console.log('Headers:', headerEntries)

  let file_path = params.slug.join('/')
  // /%E5%BB%BA%E8%AE%AE.mdx 转中文
  file_path = decodeURI(file_path)
  // console.log(`file_path: ${file_path}`)
  const fileFormat = file_path.split('.').pop() || 'md'
  // console.log(`fileFormat: ${fileFormat}`)
  const { metadata, content, rawContent } = getFile(file_path)
  // console.log(`getFileED`)

  const isAuthenticated = (await cookies()).get('authenticated')?.value === 'true'

  // console.log(`metadata, content:${JSON.stringify({ metadata, content }, null, 2)}`)
  const toc = getToc(file_path)
  // console.log(`toc: ${JSON.stringify(toc, null, 2)}`)

  if (content==null){
    notFound()
  }

  // const filesMeta = getFilesMetaTreeData()

  return (
    <div className="flex">
      <section className='flex flex-1 basis-full max-w-full'>
        {/* 结构化数据的脚本 */}
        <StructuredData file_path={file_path} metadata={metadata}  baseUrl={baseUrl} />
        {/* 左侧：files tree */}
        {/* <FileSidebar filesMeta={filesMeta} /> */}
        {/* 右侧 内容等 */}
        <div className='pb-10 flex-1 flex w-[calc(100%-var(--sidebar-width)-1px)]'>
          <div className="w-full ">
            {/* 以及控制 files tree 是否显示的按钮，file路径等信息 */}
            {/* <Header url_path={`aa/${file_path}`} /> */}
            <div className=' max-w-full'>
              {metadata.private && !isAuthenticated ? (
                <PasswordPrompt filePath={file_path}  />
                ) : (
                <>
                  {/* file metadata */}
                  <Info url_path={`aa/${file_path}`} metadata={metadata} />

                  <div className="flex w-full">
                    {/* 中间 content header+content */}
                    <MDX format={fileFormat} content={rawContent} searchParams={searchParams} />
                    {/* 右侧：file 内部大纲 */}
                    <FileToc toc={toc} />
                  </div>
                </>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}