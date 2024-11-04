"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loading from './Loading'

export function My3DComponent() {
  return (
    <Canvas className='w-full h-screen bg-transparent'
    camera={{ near: 0.1, far: 1000, position: [0, 0, 5] }}
    >
      <Suspense fallback={<Loading />}>
        <directionalLight intensity={0.5} position={[0, 10, 0]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Suspense>
    </Canvas>
  )
}