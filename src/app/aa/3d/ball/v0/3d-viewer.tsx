// 'use client'

// import React, { useRef, useEffect } from 'react'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// export default function EarthViewer() {
//   const mountRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!mountRef.current) return

//     // Scene setup
//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//     const renderer = new THREE.WebGLRenderer({ antialias: true })
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.outputEncoding = THREE.sRGBEncoding
//     mountRef.current.appendChild(renderer.domElement)

//     // Orbit controls
//     const controls = new OrbitControls(camera, renderer.domElement)
//     camera.position.z = 5
//     controls.update()

//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
//     scene.add(ambientLight)
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
//     directionalLight.position.set(5, 5, 5)
//     scene.add(directionalLight)

//     // HDR environment map
//     new RGBELoader()
//       .setPath('/')
//       .load('mud_road_puresky_2k.hdr', function (texture) {
//         texture.mapping = THREE.EquirectangularReflectionMapping
//         scene.environment = texture // Only set environment, not background
//       })

//     // GLTF and Draco loader setup
//     const dracoLoader = new DRACOLoader()
//     dracoLoader.setDecoderPath('/todo/dracp/')
//     const loader = new GLTFLoader()
//     loader.setDRACOLoader(dracoLoader)

//     // Load the 3D model
//     loader.load(
//       '/todo/e3.glb',
//       function (gltf) {
//         const model = gltf.scene
//         // Center the model
//         const box = new THREE.Box3().setFromObject(model)
//         const center = box.getCenter(new THREE.Vector3())
//         model.position.sub(center)
//         // Scale the model if needed
//         const scale = 2 // Adjust this value to change the size of the Earth
//         model.scale.set(scale, scale, scale)
//         scene.add(model)
//         // Adjust camera and controls after adding the model
//         const boundingBox = new THREE.Box3().setFromObject(model)
//         const size = boundingBox.getSize(new THREE.Vector3())
//         const maxDim = Math.max(size.x, size.y, size.z)
//         camera.position.set(0, 0, maxDim * 2)
//         controls.target.copy(model.position)
//         controls.update()
//       },
//       undefined,
//       function (error) {
//         console.error('An error happened', error)
//       }
//     )

//     // Animation loop
//     function animate() {
//       requestAnimationFrame(animate)
//       controls.update()
//       renderer.render(scene, camera)
//     }
//     animate()

//     // Handle window resize
//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight
//       camera.updateProjectionMatrix()
//       renderer.setSize(window.innerWidth, window.innerHeight)
//     }
//     window.addEventListener('resize', onWindowResize)

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', onWindowResize)
//       mountRef.current?.removeChild(renderer.domElement)
//     }
//   }, [])

//   return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
// }