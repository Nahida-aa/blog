// // src/app/[...slug]/_comp/File.tsx
// import { Card } from '@/components/ui/card';
// import { CustomMDX } from '@/components/md/mdx';
// import FileHeader from './FileHeader';
// import VsCode from './Code';
// import type { SerializeOptions } from '@/types/next-mdx-remote';

// interface FileProps {
//   format: string;
//   content: string;
//   searchParams: {
//     plain?: string;
//   };
// }

// const previewableFormats = ['md', 'mdx'];

// export default function File({ format, content, searchParams }: FileProps) {
//   const isPlain = searchParams.plain === '1';
//   const canPreview = previewableFormats.includes(format);
//   const mdxOptions: SerializeOptions = {
//     mdxOptions: {
//       format: format as 'md' | 'mdx', // 确保 format 是 'md' 或 'mdx'
//     },
//   };

//   return (
//     <Card className='w-full min-w-0'>
//       <FileHeader canPreview={canPreview} />
//       {isPlain || !canPreview ? (
//         <VsCode format={format} content={content} />
//       ) : (
//         <div className='p-8 rounded-t-none'>
//           <article className="prose max-w-[1012px] mx-auto">
//             <CustomMDX source={content} options={mdxOptions} />
//           </article>
//         </div>
//       )}
//     </Card>
//   );
// }