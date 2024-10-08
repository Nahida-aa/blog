// src/components/StructuredData.tsx
import React from 'react';

type StructuredDataProps = {
  blog_path: string;
  metadata: {
    title: string;
    pushed_at: string;
    description: string;
    image: string;
  };
  baseUrl: string;
};

export default function StructuredData({ blog_path, metadata, baseUrl }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: metadata.title,
          datePublished: metadata.pushed_at,
          dateModified: metadata.pushed_at,
          description: metadata.description,
          image: metadata.image
            ? `${baseUrl}${metadata.image}`
            : `/og?title=${encodeURIComponent(metadata.title)}`,
          url: `${baseUrl}/aa/${blog_path}`,
          author: {
            '@type': 'Person',
            name: 'My Portfolio',
          },
        }),
      }}
    />
  );
}