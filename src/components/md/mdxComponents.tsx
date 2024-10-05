import type { MDXComponents } from 'mdx/types'
import { Code } from './code';
import { Pre } from './pre/monacoPre';
import { Table } from './gfm/table';
import { createHeading } from './h_';
import Link from 'next/link';
import Image from 'next/image';
import { MDXProvider } from '@mdx-js/react';

function CustomLink({ href, children, ...props }) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return <a href={href} {...props}>{children}</a>;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

// export const MdxComponents: MDXComponents = {
export const MdxComponents = {
  // 替换组件
  // p: mdxP,
  // strong: mdxStrong,
  // blockquote: mdxBlockquote,
  // ul: mdxUl,
  // ol: mdxOl,
  // li: mdxLi,

  // h1: createHeading(1),
  // h2: createHeading(2),
  // h3: createHeading(3),
  // h4: createHeading(4),
  // h5: createHeading(5),
  // h6: createHeading(6),
  // Image: RoundedImage,
  // a: CustomLink,
  // code: Code,
  pre: Pre,
  
  // 添加组件
  // Table,
}