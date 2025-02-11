// 'use client'

// import React, { useRef, useEffect } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import * as THREE from 'three'
// import ThreeGlobe from 'three-globe'

// const CameraAndLights = () => {
//   return (
//     <PerspectiveCamera makeDefault position={[0, 0, 400]} >
//       <ambientLight color={0xbbbbbb} intensity={1} />
//       <directionalLight color={0xffffff} intensity={8} position={[-800, 2000, 400]} />
//       <directionalLight color={0xffffff} intensity={10} position={[-200, 500, 200]} />
//       <pointLight color={0x7982f6} intensity={50} position={[-200, 500, 200]} />
//     </PerspectiveCamera>
//   )
// }

// const Globe = () => {
//   const globeRef = useRef<ThreeGlobe>(undefined)
//   const { scene } = useThree()

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/md/3d/ball/earth.geo.json')
//       const countries = await response.json()

//       const globe = new ThreeGlobe()
//         .hexPolygonsData(countries.features)
//         .hexPolygonResolution(3)
//         .hexPolygonMargin(0.7)
//         .showAtmosphere(true)
//         .atmosphereColor('#6944e5')
//         .atmosphereAltitude(0.2)

//       const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial
//       globeMaterial.color = new THREE.Color('#3a228a')
//       globeMaterial.emissive = new THREE.Color('#220038')
//       globeMaterial.emissiveIntensity = 0.1
//       globeMaterial.shininess = 0.7

//       // Add arcs
//       const N = 20
//       const arcsData = [...Array(N)].map(() => ({
//         startLat: (Math.random() - 0.5) * 180,
//         startLng: (Math.random() - 0.5) * 360,
//         endLat: (Math.random() - 0.5) * 180,
//         endLng: (Math.random() - 0.5) * 360,
//         color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
//       }))

//       globe
//         .arcsData(arcsData)
//         .arcColor('color')
//         .arcDashLength(0.9)
//         .arcDashGap(4)
//         .arcDashInitialGap(() => Math.random() * 5)
//         .arcDashAnimateTime(1000)
//         .arcsTransitionDuration(1000)

//       globeRef.current = globe
//       scene.add(globe)

//       return () => {
//         scene.remove(globe)
//       }
//     }

//     fetchData()
//   }, [scene])

//   useFrame(() => {
//     if (globeRef.current) {
//       globeRef.current.rotation.y += 0.002
//     }
//   })

//   return (
//     <>
//       <CameraAndLights />
//       <OrbitControls
//         enableDamping
//         dampingFactor={0.01}
//         enablePan={false}
//         minDistance={200}
//         maxDistance={500}
//         rotateSpeed={0.8}
//         zoomSpeed={1}
//         autoRotate
//         minPolarAngle={Math.PI / 3.5}
//         maxPolarAngle={Math.PI - Math.PI / 3}
//       />
//     </>
//   )
// }

// export default Globe