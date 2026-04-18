import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const TunnelCanvas = () => {
  const meshRef = useRef()

  // Generate a path for the tube
  const path = useMemo(() => {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale = 1) {
        super()
        this.scale = scale
      }
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const tx = t * 3 - 1.5
        const ty = Math.sin(2 * Math.PI * t)
        const tz = 0
        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
      }
    }
    return new CustomSinCurve(10)
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the tunnel to create a moving forward illusion
      meshRef.current.rotation.x += delta * 0.1
      // meshRef.current.rotation.y += delta * 0.1
      
      // Move texture offset to simulate forward movement
      if(meshRef.current.material.map) {
        meshRef.current.material.map.offset.x -= delta * 0.5
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} color="#f97316" intensity={2} distance={20} />
      
      {/* We position the camera inside the tube. But fiber handles camera. */}
      <mesh ref={meshRef} position={[0, 0, -20]} rotation={[0, 0, Math.PI / 2]}>
        <tubeGeometry args={[path, 100, 4, 32, false]} />
        <meshStandardMaterial 
          color="#111" 
          wireframe={true} 
          emissive="#f97316"
          emissiveIntensity={0.1}
          side={THREE.BackSide}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </>
  )
}
