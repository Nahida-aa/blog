// src/app/.../_comp/galaxy/MessageGalaxy.tsx
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

const MessageGalaxy = ({
  messages = [],
  scale = 2,
  planetSize = 1,
  satelliteSize = 0.3,
  minDistance = 2
}) => {
  const planetRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={planetRef} scale={[scale, scale, scale]}>
      <Sphere args={[planetSize, 64, 64]}>
        <meshStandardMaterial attach="material"
          color="#4B0082"
          metalness={0.7}
          roughness={0.2}
        />
      </Sphere>
      {messages.map((message, index) => {
        const phi = Math.acos(-1 + (2 * index) / messages.length)
        const theta = Math.sqrt(messages.length * Math.PI) * phi
        const radius = minDistance + Math.random() * 0.5 // Varying distance from the planet
        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)

        return (
          <group key={message.id} position={[x, y, z]}>
            <Sphere args={[satelliteSize, 16, 16]}>
              <meshStandardMaterial attach="material" color="#FFD700" />
            </Sphere>

          </group>
        )
      })}
    </group>
  )
}

export default MessageGalaxy