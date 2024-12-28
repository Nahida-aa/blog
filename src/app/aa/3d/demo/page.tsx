import React from 'react'
import dynamic from 'next/dynamic'

const GlobeCanvas = dynamic(() => import('@/app/demo/globe/GlobeCanvas'), { ssr: false })

export default function Home() {
  return (
    <div>
      <GlobeCanvas />
    </div>
  )
}