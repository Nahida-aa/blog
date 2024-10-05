import React from 'react';
import { slugify } from '@/lib/util/slug'

export function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string);
    return (
      <div className="heading-container">
        {React.createElement(`h${level}`, { id: slug, className: 'heading-element' }, children)}
        <a href={`#${slug}`} className="anchor">#</a>
      </div>
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}