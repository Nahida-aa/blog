// src/app/(blog)/aa/[slug]/_components/MDX.tsx
import { Card } from '@/components/ui/card';
import { CustomMDX } from '@/components/md/mdx';
import MdxHeader from './MDX/MdxHeader';

import type { Post } from '@/types/mdx';

interface BlogContentProps {
  post: Post;
}

export default function BlogContent({ post }: BlogContentProps) {
  // console.log(post.content);
  return (
    <Card className=' w-full'>
      <MdxHeader /> {/* 使用 MdxHeader 组件 */}
      <Card className='p-8 rounded-t-none'>
        <article className="prose max-w-[1012px] mx-auto">
          <CustomMDX source={post.content} />
        </article>
      </Card>
    </Card>
  );
}