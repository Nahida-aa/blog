// "use server"
// "use client";
// import type { MDXComponents } from 'mdx/types'
// import { MDXProvider } from '@mdx-js/react';
// import { Code } from './code';
import { Pre } from './pre/monacoPre';
// import { Table } from './gfm/table';
import { H1,H2,H3,H4,H5,H6 } from './h_';
import CustomImage from './Image';
import Age from './other/Age';
// import { MDXProvider } from '@mdx-js/react';

// import Link from 'next/link';
// function CustomLink({ href, children, ...props } : React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
//   if (href?.startsWith('/')) {
//     return (
//       <Link href={href} {...props}>
//         {children}
//       </Link>
//     );
//   }

//   if (href?.startsWith('#')) {
//     return <a href={href} {...props}>{children}</a>;
//   }

//   return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
// }

// function RoundedImage(props: any) {
//   return <Image alt={props.alt} className="rounded-lg" {...props} />;
// }

// export const MdxComponents: MDXComponents = {
// export const MdxComponents: React.ComponentProps<typeof MDXProvider>['components'] = {
export const MdxComponents = {
  // 替换组件
  // p: mdxP,
  // strong: mdxStrong,
  // blockquote: mdxBlockquote,
  // ul: mdxUl,
  // ol: mdxOl,
  // li: mdxLi,
  // a: CustomLink,
  
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  // Image: RoundedImage,
  // code: Code,
  
  // 添加组件
  // Table,
  Image: CustomImage,
  Age
}
// console.log(`mdxMdxComponents: MdxComponents:`);
// console.log(MdxComponents)