// src/app/.../_comp/MessageGalaxyWithCtrl.tsx
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MessageGalaxy from './MessageGalaxy'
import ControlPanel from './ControlPanel'
import { Card } from '@/components/ui/card'

const MessageGalaxyWithCtrl = ({ messages }) => {
  const [scale, setScale] = useState(2)
  const [planetSize, setPlanetSize] = useState(1)
  const [satelliteSize, setsatelliteSize] = useState(0.3)
  const [minDistance, setMinDistance] = useState(2)

  return (
    <section className='w-full flex'>
      <Card className="h-[600px] w-full rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MessageGalaxy messages={messages} scale={scale} planetSize={planetSize} satelliteSize={satelliteSize} minDistance={minDistance} />
          <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} />
        </Canvas>
      </Card>
      <ControlPanel
        scale={scale}
        setScale={setScale}
        planetSize={planetSize}
        setPlanetSize={setPlanetSize}
        satelliteSize={satelliteSize}
        setsatelliteSize={setsatelliteSize}
        minDistance={minDistance}
        setMinDistance={setMinDistance}
      />
    </section>
  )
}

export default MessageGalaxyWithCtrl