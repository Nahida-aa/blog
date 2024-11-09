// src/app/[...slug]/_comp/FileHeader.tsx
"use client"
import { Eye, Code, List } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToc } from '@/context/TocContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'

interface FileHeaderProps {
  canPreview: boolean;
}

export default function FileHeader({ canPreview }: FileHeaderProps) {
  const [selectedOption, setSelectedOption] = useState(canPreview ? 'preview' : 'code');
  const { toggleToc } = useToc();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const plain = searchParams.get('plain');
    if (plain === '1') {
      setSelectedOption('code');
    } else if (canPreview) {
      setSelectedOption('preview');
    }
  }, [searchParams, canPreview]);

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };
  
  return (
    <div className='rounded-b-none p-2 flex justify-between items-center bg-muted'>
      <ul className='flex h-7 items-center bg-[#37344b5e] rounded-md'>
        <li className={`flex h-7 rounded-md items-center relative ${selectedOption === 'preview' ? 'bg-[#0601097a]' : ''}`}>
          <Link href={pathname}>
            <Button variant='ghost' 
            className="px-2 py-1.5 h-7 m-0 size-auto" onClick={() => handleClick('preview')} disabled={!canPreview}>
              <Eye size={16} className='mr-2' />Preview
            </Button>
          </Link>
          <span className="absolute right-0 h-4 w-px bg-[#3d444d]"></span>
        </li>
        <li className={`flex h-7 rounded-md items-center ${selectedOption === 'code' ? 'bg-[#04010947]' : ''}`}>
          <Link href='?plain=1'>
            <Button variant='ghost' className="px-2 py-1.5 h-7 size-auto" onClick={() => handleClick('code')}>
              <Code size={16} className='mr-2' />Code
            </Button>
          </Link>
        </li>
      </ul>
      
      <button className="mr-2" onClick={toggleToc}>
        <List size={16} />
      </button>
    </div>
  );
}