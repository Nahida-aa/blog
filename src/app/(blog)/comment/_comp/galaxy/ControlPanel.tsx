// src/app/.../_comp/ControlPanel.tsx
import React from 'react'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'

const ControlPanel = ({ scale, setScale, planetSize, setPlanetSize, satelliteSize, setsatelliteSize, minDistance, setMinDistance }) => {
  return (
    <Card className=" w-64  p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 ">Control Panel</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium  ">Scale: {scale.toFixed(1)}</label>
        <Slider
          value={[scale]}
          onValueChange={(value) => setScale(value[0])}
          min={0.5}
          max={3}
          step={0.1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Planet Size: {planetSize.toFixed(1)}</label>
        <Slider
          value={[planetSize]}
          onValueChange={(value) => setPlanetSize(value[0])}
          min={0.5}
          max={2}
          step={0.1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Asteroid Size: {satelliteSize.toFixed(1)}</label>
        <Slider
          value={[satelliteSize]}
          onValueChange={(value) => setsatelliteSize(value[0])}
          min={0.1}
          max={1}
          step={0.1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Min Distance: {minDistance.toFixed(1)}</label>
        <Slider
          value={[minDistance]}
          onValueChange={(value) => setMinDistance(value[0])}
          min={1}
          max={5}
          step={0.1}
        />
      </div>
    </Card>
  )
}

export default ControlPanel