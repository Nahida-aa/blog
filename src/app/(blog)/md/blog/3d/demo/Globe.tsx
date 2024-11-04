// 'use client'

// import React, { useRef, useEffect, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, useGLTF } from '@react-three/drei'
// import * as THREE from 'three'
// import ThreeGlobe from 'three-globe'
// // import countries from '/public/md/3d/ball/earth.geo.json'

// const Globe = () => {
//   const globeRef = useRef<ThreeGlobe>()

//   const [countries, setCountries] = useState(null)

//   useEffect(() => {
//     // 加载地球数据
//     fetch('/md/3d/ball/earth.geo.json')
//       .then(response => response.json())
//       .then(data => setCountries(data))
//   }, [])

//   useEffect(() => {
//     if (!countries) return
//     const globe = new ThreeGlobe()
//       .hexPolygonsData(countries.features)
//       .hexPolygonResolution(3)
//       .hexPolygonMargin(0.7)
//       .showAtmosphere(true)
//       .atmosphereColor('#6944e5')
//       .atmosphereAltitude(0.2)
//       .arcsData([...Array(20).keys()].map(() => ({
//         startLat: (Math.random() - 0.5) * 180,
//         startLng: (Math.random() - 0.5) * 360,
//         endLat: (Math.random() - 0.5) * 180,
//         endLng: (Math.random() - 0.5) * 360,
//         color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
//       })))
//       .arcColor('color')
//       .arcDashLength(0.9)
//       .arcDashGap(4)
//       .arcDashInitialGap(() => Math.random() * 5)
//       .arcDashAnimateTime(1000)
//       .arcsTransitionDuration(1000)

//     const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial
//     globeMaterial.color = new THREE.Color('#3a228a')
//     globeMaterial.emissive = new THREE.Color('#220038')
//     globeMaterial.emissiveIntensity = 0.1
//     globeMaterial.shininess = 0.7

//     globeRef.current.add(globe)
//     // globeRef.current = globe
//   }, [])

//   useFrame(() => {
//     if (globeRef.current) {
//       globeRef.current.rotation.y += 0.001
//     }
//   })

//   return (
//     <mesh ref={globeRef}>
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial color="blue" />
//     </mesh>
//   )
// }

// const GlobeCanvas = () => {
//   return (
//     <Canvas>
//       <ambientLight intensity={1} />
//       <directionalLight color="white" intensity={1} position={[0, 0, 5]} />
//       <Globe />
//       <OrbitControls />
//     </Canvas>
//   )
// }

// export default GlobeCanvas