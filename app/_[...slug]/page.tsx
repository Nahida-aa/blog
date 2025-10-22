// import { cookies } from "next/headers";
// import { getFile } from "./lib/get";
// import PasswordPrompt from "./_comp//PasswordPrompt"
// import Info from "./_comp/Info";
// import FileToc from "./_comp/FileToc";
// import { getToc } from '@/lib/mdx/get'
// import File from './_comp/File'
// import { notFound } from "next/navigation";
// // import { TocProvider } from "@/context/TocContext";

// export interface FileProps {
//   params: Promise<{ slug: string[] }>;
//   searchParams: Promise<{ plain?: string }>;
// }
// export default async function FilePage(props: FileProps) {
//   const searchParams = await props.searchParams;
//   const params = await props.params;
//   let file_path = params.slug.join('/')
//   // /%E5%BB%BA%E8%AE%AE 转中文
//   file_path = decodeURI(file_path)
//   const fileFormat = file_path.split('.').pop() || 'md'
//   const { metadata, content, rawContent } = getFile(file_path)
//   if (!content) notFound()
//   const isAuthenticated = (await cookies()).get('authenticated')?.value === 'true'
//   const toc = getToc(file_path)

//   return (
//     // <TocProvider>
//     <main className="flex">
//       <div className=' max-w-full w-full'>
//         {metadata?.private && !isAuthenticated ? (
//           <PasswordPrompt filePath={file_path} />
//         ) : (
//           <>
//             {/* file metadata */}
//             <Info url_path={`${file_path}`} metadata={metadata} />

//             <div className="flex w-full">
//               {/* 中间 content header+content */}
//               <File format={fileFormat} content={rawContent} searchParams={searchParams} />
//               {/* 右侧：file 内部大纲 */}
//               <FileToc toc={toc} />
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//     // </TocProvider>
//   );
// }