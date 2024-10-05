// src/components/StructuredData.tsx
import React from 'react';
import { Post } from '@/types/mdx';

export default function StructuredData({ post, baseUrl }: { post: Post; baseUrl: string }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
          description: post.metadata.summary,
          image: post.metadata.image
            ? `${baseUrl}${post.metadata.image}`
            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
          url: `${baseUrl}/aa/${post.slug}`,
          author: {
            '@type': 'Person',
            name: 'My Portfolio',
          },
        }),
      }}
    />
  );
}