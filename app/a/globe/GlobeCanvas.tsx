'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
// import Globe from './Globe'


export default function GlobeCanvas() {
  return (
      <Canvas >
        <Suspense fallback={null}>
          {/* <Globe /> */}
        </Suspense>
      </Canvas>
  )
}