// src/app/(blog)/aa/[slug]/_components/BlogToc.tsx
"use client";
import { Card } from '@/components/ui/card';
import { useToc } from '@/context/TocContext';
type TocItem = {
  id: string;
  title: string;
};

interface BlogTocProps {
  toc: TocItem[];
}
export default function BlogToc({ toc }: BlogTocProps) {
  const { isTocOpen } = useToc();

  if (!isTocOpen) {
    return null;
  }

  return (
    <Card className="h-full max-h-[100vh] flex flex-col md:w-1/3 md:min-w-[320px] md:max-w-[460px] ml-4">
      <section className='mx-2 mt-2'>
        <div className='flex justify-between'>
          <h3>Outline</h3>
          <button></button>
        </div>
        <nav className=''>
          <ul className='py-2'>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </Card>
  );
}