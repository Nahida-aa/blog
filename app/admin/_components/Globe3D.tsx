// 'use client'
// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// // import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { scaleLinear } from 'd3-scale';
// import ThreeGlobe from 'three-globe';

// interface GlobeData {
//   lat: number;
//   lng: number;
//   value: number;
// }

// interface Globe3DProps {
//   data: GlobeData[];
// }

// const Globe3D: React.FC<Globe3DProps> = ({ data }) => {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Set up scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });

//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create globe
//     const globe = new ThreeGlobe()
//       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
//       .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
//       .pointsData(data)
//       .pointAltitude('value')
//       .pointColor(() => '#ff3333')
//       .pointRadius(0.05);

//     // Add globe to the scene
//     scene.add(globe);

//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xbbbbbb);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(directionalLight);

//     // Position camera
//     camera.position.z = 300;

//     // Add controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;
//     controls.enableZoom = true;

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [data]);

//   return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default Globe3D;