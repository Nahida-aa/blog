// "use server"
// "use client"
import { 
  // MDXRemote, 
  compileMDX,
  MDXRemoteProps } from 'next-mdx-remote/rsc';
// import React from 'react';
// import { Pre } from './pre/monacoPre';

import { MdxComponents } from './mdxComponents'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math' // 用于将 math 标记为 code and pre/code
import rehypeKatex from 'rehype-katex'
// import rehypeMathjax from 'rehype-mathjax'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import mdxErrorHandler from '@/lib/mdx/parse/error-handler'

// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';


// import { Pre } from './pre/monacoPre';


// mdx2html: 工作流程是先将 MDX 源码解析为 JSX, 然后再根据需要切换和渲染自定义组件
export async function CustomMDX(props: MDXRemoteProps) {
  const options = {
    // made available to the arguments of any custom MDX component
    // scope: {},
    // MDX's available options, see the MDX docs for more info.
    // https://mdxjs.com/packages/mdx/#compilefile-options
    mdxOptions: {
      // jsx: true,
      remarkPlugins: [ mdxErrorHandler,remarkGfm,remarkMath],
      rehypePlugins: [
        rehypeKatex,
        // rehypeMathjax,
        // 下面的插件必须最后使用
        rehypeMdxCodeProps],
      // format: 'mdx',
    },
    // Indicates whether or not to parse the frontmatter from the MDX source
    // parseFrontmatter: false,
  }
  const components = {
    ...MdxComponents,
    // pre: Pre,
    // h1: createHeading(1),
    // Image,
    ...(props.components || {})
  };
  const { content
    // , frontmatter 
  } = await compileMDX({
    ...props,
    source: props.source, 
    options: {...options, ...(props.options||{}) },
    components
  })
  // console.log(`content:`)
  // console.log(content)

  return (
    content
    // <MDXRemote
    //   {...props}
    //   options={{...options, ...(props.options||{}) }}
    //   components={components}
    // />
  );
}