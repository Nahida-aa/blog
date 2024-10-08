// src/app/(blog)/aa/[slug]/_components/MDX.tsx
import { Card } from '@/components/ui/card';
import { CustomMDX } from '@/components/md/mdx';
import MdxHeader from './MDX/MdxHeader';


export default function BlogContent({ content }: { content: string }) {
  // console.log(post.content);
  return (
    <Card className=' w-full min-w-0'>
      <MdxHeader /> {/* 使用 MdxHeader 组件 */}
      <Card className='p-8 rounded-t-none'>
        <article className="prose max-w-[1012px] mx-auto">
          <CustomMDX source={content} />
        </article>
      </Card>
    </Card>
  );
}