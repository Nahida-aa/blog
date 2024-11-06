'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('@/app/demo/globe/Globe'), 
// { ssr: false }
)


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas >
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  )
}