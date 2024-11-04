// "use client";
// // src/components/Globe.tsx
// import { useRef, useEffect, useState } from 'react'
// import { Color, MeshPhongMaterial } from 'three'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import ThreeGlobe from 'three-globe'
// // import countries from '../public/earth.geo.json'

// function GlobeComponent() {
//   const globeRef = useRef<ThreeGlobe>()

//   const [countries, setCountries] = useState(null)
//   useEffect(() => {
//     // 加载地球数据
//     fetch('/md/3d/ball/earth.geo.json')
//       .then(response => response.json())
//       .then(data => setCountries(data))
//   }, [])
//   const N = 20
//   const arcsData = [...Array(N).keys()].map(() => ({
//     startLat: (Math.random() - 0.5) * 180,
//     startLng: (Math.random() - 0.5) * 360,
//     endLat: (Math.random() - 0.5) * 180,
//     endLng: (Math.random() - 0.5) * 360,
//     // color: ['#ff0000', '#00ff00', '#0000ff'][Math.round(Math.random() * 3)]
//     color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
//   }))

//   useEffect(() => {
//     if (!countries) return
//     const globe = new ThreeGlobe()
//       .hexPolygonsData(countries.features)
//       .hexPolygonResolution(3)
//       .hexPolygonMargin(0.7)
//       .showAtmosphere(true)
//       .atmosphereColor('#6944e5')
//       .atmosphereAltitude(0.2)
//       .arcsData(arcsData)
//       .arcColor('color')
//       .arcDashLength(0.9)
//       .arcDashGap(4)
//       .arcDashInitialGap(() => Math.random() * 5)
//       .arcDashAnimateTime(1000)
//       .arcsTransitionDuration(1000)

//     const globeMaterial = globe.globeMaterial() as MeshPhongMaterial
//     globeMaterial.color = new Color('#3a228a')
//     globeMaterial.emissive = new Color('#220038')
//     globeMaterial.emissiveIntensity = 0.1
//     globeMaterial.shininess = 0.7

//     globeRef.current = globe
//   }, [])

//   return globeRef.current ? <primitive object={globeRef.current} /> : null
// }

// export default function Globe() {
//   return (
//     <Canvas style={{ height: '100vh', background: '#040d21' }}>
//       <PerspectiveCamera makeDefault position={[0, 0, 400]} />
//       <ambientLight color={0xbbbbbb} intensity={1} />
//       <directionalLight color={0xffffff} intensity={8} position={[-800, 2000, 400]} />
//       <directionalLight color={0xffffff} intensity={10} position={[-200, 500, 200]} />
//       <pointLight color={0x7982f6} intensity={50} position={[-200, 500, 200]} />
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
//       <GlobeComponent />
//     </Canvas>
//   )
// }
