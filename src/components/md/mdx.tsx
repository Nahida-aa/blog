import { MDXRemote,type  MDXRemoteProps, compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { MdxComponents } from './mdxComponents';

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math' // 用于将 math 标记为 code and pre/code
import rehypeKatex from 'rehype-katex'
import rehypeMathjax from 'rehype-mathjax'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'


// mdx2html: 工作流程是先将 MDX 源码解析为 JSX, 然后再根据需要切换和渲染自定义组件
export async function CustomMDX(props: any) {
  const options = {
    // made available to the arguments of any custom MDX component
    // scope: {},
    // MDX's available options, see the MDX docs for more info.
    // https://mdxjs.com/packages/mdx/#compilefile-options
    mdxOptions: {
      // jsx: true,
      remarkPlugins: [ remarkGfm,remarkMath],
      rehypePlugins: [
        rehypeKatex,
        // rehypeMathjax,
        // 下面的插件必须最后使用
        rehypeMdxCodeProps],
      // format: 'mdx',
    },
    // Indicates whether or not to parse the frontmatter from the MDX source
    parseFrontmatter: false,
  }
  const { content, frontmatter } = await compileMDX({
    ...props,
    source: props.source, 
    options: {...options, ...(props.options||{}) },
    components:{
      ...MdxComponents, 
      ...(props.components || {}) }
  })

  return (content
    // <MDXRemote
    //   {...props}
    //   options={{...options, ...(props.options||{}) }}
    //   components={{ 
    //     ...MdxComponents, 
    //     ...(props.components || {}) }}
    // />
  );
}