// src/app/(blog)/aa/[...slug]/_components/MDX/index.tsx
import { Card } from '@/components/ui/card';
import { CustomMDX } from '@/components/md/mdx';
import MdxHeader from './MdxHeader';
import VsCode from './code';

interface MDXProps {
  content: string;
  searchParams: {
    plain?: string;
  };
}

export default function MDX({ content, searchParams }: MDXProps) {
  const isPlain = searchParams.plain === '1';

  return (
    <Card className='w-full min-w-0'>
      <MdxHeader />
      
        {isPlain ? (
          <VsCode content={content} />
        ) : (
          <div className='p-8 rounded-t-none'>
          <article className="prose max-w-[1012px] mx-auto">
            <CustomMDX source={content} />
          </article>
          </div>
        )}
      
    </Card>
  );
}