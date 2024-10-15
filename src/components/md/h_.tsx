"use server";
import React from 'react';
import { text2slug } from '@/lib/util/slug';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react'

function createHeading(level: number) {
  const Heading = ({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
    const content = children || ''; // 如果 children 为空，则使用空字符串
    const slug = text2slug(content as string);

    return (
      <div className="heading-container">
        {React.createElement(`h${level}`, { id: slug, className: 'heading-element', ...props }, content)}
        <a href={`#${slug}`} className="anchor">
          {level === 1 && <Heading1 size={16} />}
          {level === 2 && <Heading2 size={16} />}
          {level === 3 && <Heading3 size={16} />}
          {level === 4 && <Heading4 size={16} />}
          {level === 5 && <Heading5 size={16} />}
          {level === 6 && <Heading6 size={16} />}
        </a>
      </div>
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);