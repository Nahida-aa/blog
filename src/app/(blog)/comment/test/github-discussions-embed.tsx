'use client'

import { useEffect, useRef } from 'react'

export default function GitHubDiscussionsEmbed({ 
  repositoryOwner, 
  repositoryName, 
  discussionNumber,
  theme = 'light'
}: { 
  repositoryOwner: string, 
  repositoryName: string, 
  discussionNumber: number,
  theme?: 'light' | 'dark'
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', `${repositoryOwner}/${repositoryName}`)
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID')
    script.setAttribute('data-mapping', 'number')
    script.setAttribute('data-term', discussionNumber.toString())
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', 'en')
    script.crossOrigin = 'anonymous'
    script.async = true

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current) {
        const giscusFrame = containerRef.current.querySelector('iframe')
        if (giscusFrame) {
          containerRef.current.removeChild(giscusFrame)
        }
      }
    }
  }, [repositoryOwner, repositoryName, discussionNumber, theme])

  return <div ref={containerRef} className="w-full" />
}