import Image from 'next/image';
import { Avatar as CnAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ComponentProps } from 'react';
import { ServerImage } from './server';
import { cn } from '@/lib/utils';

export const Avatar = ({ src, name, size = 32, className,
  ...props
}: Omit<ComponentProps<typeof ServerImage>,
  'alt' | 'width' | 'height' | 'src'> & {
    name?: string,
    size?: number,
    src?: string | null
  }) => {
  const src1 = src || `https://ui-avatars.com/api/?name=${name}&size=${size}&background=random`

  // return <CnAvatar>
  //   <ServerImage src={src1} alt={name} width={size} height={size} {...props} />
  //   <AvatarFallback>{name.charAt(0)}</AvatarFallback>
  // </CnAvatar>
  return <ServerImage src={src} alt={name || 'avatar'}
    width={size} height={size} className={cn('rounded-full', className)}
    {...props} />
}