import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const HeroCanvas = () => {
  const meshRef = useRef()
  const pointsRef = useRef()
  const { mouse } = useThree()

  // Generate particles
  const [positions, colors] = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const color1 = new THREE.Color('#f97316') // orange-500
    const color2 = new THREE.Color('#fbbf24') // amber-400

    for (let i = 0; i < count; i++) {
      // Random position in a sphere logic, simplified to a box area
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5

      const blendedColor = color1.clone().lerp(color2, Math.random())
      colors[i * 3] = blendedColor.r
      colors[i * 3 + 1] = blendedColor.g
      colors[i * 3 + 2] = blendedColor.b
    }
    return [positions, colors]
  }, [])

  useFrame((state, delta) => {
    // Rotate Torus Knot
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
      
      // Mouse Parallax effect for object
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (mouse.x * 2), 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (mouse.y * 2), 0.05)
    }

    // Drift particles
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
      
      // Mouse parallax for particles
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, (mouse.x * 1), 0.02)
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, (mouse.y * 1), 0.02)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#f97316" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#fbbf24" intensity={1} />

      <mesh ref={meshRef}>
        <torusKnotGeometry args={[2.5, 0.8, 100, 16]} />
        <meshStandardMaterial 
          color="#f97316" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </mesh>

      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial 
          transparent 
          vertexColors 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </>
  )
}
