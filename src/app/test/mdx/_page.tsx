// src/app/test/mdx/page.tsx
import { Card } from '@/components/ui/card';
import { CustomMDX } from '@/components/md/mdx';
import MdxHeader from '@/app/(blog)/aa/[...slug]/_components/MDX/MdxHeader';

const mdxContent = `
# Hello, MDX!

This is a test of the MDX content rendering.

\`\`\`tsx
type vscodeThemeJSON = {
  name: string
  type: 'dark' | 'light'
  semanticHighlighting: boolean // 是否启用语义高亮(即将使用语言服务器提供的语义信息来高亮)
  colors: {
    [key: string]: string
  };
  tokenColors: {
    name?: string
    scope: string | string[]
    settings: {
      [key: string]: string
    };
  }[];
};
// 这是一个初始值示例
function greet() {
  console.log("Hello, world!");
}

greet();
\`\`\`
`;

export default function BlogContent(
  // { content }: { content: string }
) {
  // console.log(post.content);
  return (
    <Card className=' w-full min-w-0'>
      <MdxHeader />
      <Card className='p-8 rounded-t-none'>
        <article className="prose max-w-[1012px] mx-auto">
          <CustomMDX source={mdxContent} />
        </article>
      </Card>
    </Card>
  );
}