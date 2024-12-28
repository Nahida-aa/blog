// src/app/(blog)/aa/[...slug]/_components/MDX/index.tsx
import { Card } from '@/components/ui/card';
import { CustomMDX } from '@/components/md/mdx';
import MdxHeader from './MdxHeader';
import VsCode from './code';
import type { SerializeOptions } from '@/types/next-mdx-remote';

interface MDXProps {
  format: string;
  content: string;
  searchParams: {
    plain?: string;
  };
}

export default function MDX({ format,content, searchParams }: MDXProps) {
  // console.log(`MDX: ${JSON.stringify({ format, searchParams }, null, 2)}`)
  const isPlain = searchParams.plain === '1';
  const mdxOptions: SerializeOptions = {
    mdxOptions: {
      format: format as 'md' | 'mdx', // 确保 format 是 'md' 或 'mdx'
    },
  };
  return (
    <Card className='w-full min-w-0'>
      <MdxHeader />
      
        {isPlain ? (
          <VsCode content={content} />
        ) : (
          <div className='p-8 rounded-t-none'>
          <article className="prose max-w-[1012px] mx-auto">
            <CustomMDX source={content} options={mdxOptions} />
          </article>
          </div>
        )}
      
    </Card>
  );
}