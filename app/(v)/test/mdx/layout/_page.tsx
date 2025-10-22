// // import BlogToc from "@/app/(blog)/aa/[...slug]/_components/BlogToc";
// import Header from "@/app/(blog)/aa/[...slug]/_components/Header";
// import Info from "@/app/(blog)/aa/[...slug]/_components/Info";
// import MDX from "@/app/(blog)/aa/[...slug]/_components/MDX";
// import BlogSidebar from "@/app/(blog)/aa/[...slug]/_components/Sidebar";
// // import PostTree from "@/app/(blog)/aa/[...slug]/_components/Sidebar/PostTree";
// import { getBlogsMetaTreeData
//   // , getToc 
// } from "@/app/(blog)/aa/[...slug]/func";
// // import { Button } from "@/components/ui/button";
// import { getBlog } from "@/lib/mdx/get";
// // import {  PanelLeftClose } from "lucide-react";
// import { notFound } from "next/navigation";


// interface PageProps {

//   searchParams: {
//     plain?: string
//   }
// }
// export default function Page({ searchParams }: PageProps) {
//   const blogsMetaTreeData = getBlogsMetaTreeData()
//   const blog_path = 'py/base'
//   const { metadata, mdxContent } = getBlog(blog_path)
//   // const toc = getToc(blog_path)
//   if (!mdxContent){
//     notFound()
//   }
//   return (
//     <div className="flex">
//       <section className='flex flex-1 max-w-full'>
//         {/* 左侧：文件列表 */}
//         <BlogSidebar PostTrees={blogsMetaTreeData} />
//         {/* <aside className='min-w-[257px] w-[257px]'></aside> */}
//         {/* 右侧  */}
//         <main className='pb-10 flex-1 flex  flex-grow max-w-full w-[calc(100%-var(--sidebar-width)-1px)]'>
//           <div className="w-full">
//             {/* 以及控制文章列表是否展开的按钮(展开时不显示)，文章路径等信息 */}
//             <Header url_path={`aa/${blog_path}`} />
//             <div className='m-4 max-w-full'>
//               {/* 时间等信息 */}
//               <Info url_path={`aa/${blog_path}`} metadata={metadata} />

//               <div className='flex flex-row'>
//                 {/* 中间：文章header+content */}
//                 <MDX content={mdxContent} searchParams={searchParams} />
//                 {/* 右侧：文章内部大纲 */}
//                 {/* <BlogToc toc={toc} /> */}
//               </div>
//             </div>
//           </div>
//         </main>
//       </section>
//     </div>
//   );
// }