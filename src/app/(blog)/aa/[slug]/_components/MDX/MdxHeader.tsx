// src/app/(blog)/aa/[slug]/_components/MDX/MdxHeader.tsx
"use client";
import { Eye, Code, List } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useToc } from '@/context/TocContext';

export default function MdxHeader() {
  const [selectedOption, setSelectedOption] = useState('preview');
  const { toggleToc } = useToc();

  return (
    <Card className='rounded-b-none p-2 flex justify-between items-center bg-muted'>
      <ul className='flex h-7 items-center bg-[#262c36] rounded-md'>
        <li className={`flex h-7 rounded-md items-center relative ${selectedOption === 'preview' ? 'bg-[#010409]' : ''}`}>
          <button className="px-2" onClick={() => setSelectedOption('preview')}>
            <Eye size={16} />
          </button>
          <span className="absolute right-0 h-4 w-px bg-[#3d444d]"></span>
        </li>
        <li className={`flex h-7 rounded-md items-center ${selectedOption === 'code' ? 'bg-[#010409]' : ''}`}>
          <button className="px-2" onClick={() => setSelectedOption('code')}>
            <Code size={16} />
          </button>
        </li>
      </ul>
      
      <button className="mr-2" onClick={toggleToc}>
        <List size={16} />
      </button>
    </Card>
  );
}