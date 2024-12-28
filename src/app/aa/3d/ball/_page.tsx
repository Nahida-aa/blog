// // src/app/.../page.tsx
// "use client"
// import React, { useRef, useEffect } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
// import * as THREE from 'three'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// const Earth3D = () => {
//   const planetRef = useRef(null)

//   // 加载 Draco 解码器
//   const dracoLoader = new THREE.DRACOLoader()
//   dracoLoader.setDecoderPath('/dracp/')

//   // 加载 GLB 模型
//   const { scene } = useGLTF('/e3.glb', dracoLoader)

//   // 加载 HDR 环境贴图
//   useEffect(() => {
//     const loader = new RGBELoader()
//     loader.load('/mud_road_puresky_2k.hdr', (texture) => {
//       texture.mapping = THREE.EquirectangularReflectionMapping
//       scene.environment = texture
//     })
//   }, [scene])

//   useFrame(() => {
//     if (planetRef.current) {
//       planetRef.current.rotation.y += 0.001
//     }
//   })

//   return (
//     <Canvas camera={{ position: [0, 0, 8] }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Environment background={true} files="/mud_road_puresky_2k.hdr" />
//       <group ref={planetRef}>
//         <primitive object={scene} />
//       </group>
//       <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
//     </Canvas>
//   )
// }

// export default function Page() {
//   return (
//     <>
//       <h1>3D Showcase</h1>
//       <p>This page showcases a 3D model with Draco compression and HDR environment.</p>
//       <Earth3D />
//     </>
//   )
// }