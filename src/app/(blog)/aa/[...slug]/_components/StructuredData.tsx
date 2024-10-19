// src/components/StructuredData.tsx
import React from 'react';

type StructuredDataProps = {
  file_path: string;
  metadata: {
    title: string;
    pushed_at: string;
    description: string;
    image: string;
  };
  baseUrl: string;
};

export default function StructuredData({ file_path, metadata, baseUrl }: StructuredDataProps) {
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
          url: `${baseUrl}/aa/${file_path}`,
          author: {
            '@type': 'Person',
            name: 'My Portfolio',
          },
        }),
      }}
    />
  );
}