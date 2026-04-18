import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroCanvas } from './HeroCanvas'
import { HeroText } from './HeroText'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
      {/* Background - Canvas for Desktop, CSS for Mobile */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {!isMobile ? (
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <Canvas
              camera={{ position: [0, 0, 15], fov: 45 }}
              dpr={[1, 2]} // Cap pixel ratio for performance
              gl={{ antialias: false }} // Save performance
            >
              <HeroCanvas />
            </Canvas>
          </Suspense>
        ) : (
          <div className="w-full h-full bg-background relative overflow-hidden">
            {/* CSS fallback animation for mobile */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s'}} />
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <HeroText />
    </section>
  )
}

export default Hero
