import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_DETAILS } from '../../utils/constants'

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const barRef = useRef(null)
  const initials = PERSONAL_DETAILS.name.split(' ').map(n => n[0]).join('')

  useEffect(() => {
    // Fake progress loading
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        
        // Trigger exit animation
        const tl = gsap.timeline()
        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        }, "+=0.2")
        .to(barRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power4.inOut"
        }, "<")
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        }, "-=0.2")
      }
      setProgress(currentProgress)
    }, 150)

    // Initial enter animation
    gsap.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        <h1 
          ref={textRef} 
          className="text-6xl md:text-8xl font-syne font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary mb-8"
        >
          {initials}
        </h1>
        
        <div className="w-64 h-1 bg-mute/20 rounded-full overflow-hidden">
          <div 
            ref={barRef}
            className="h-full bg-primary origin-left transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        
        <div className="absolute -bottom-8 font-mono text-sm text-mute">
          {progress}%
        </div>
      </div>
    </div>
  )
}

export default Loader
