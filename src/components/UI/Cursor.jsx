import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const Cursor = () => {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    setIsVisible(true)

    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      
      // Move dot instantly
      gsap.set(dotRef.current, {
        x: clientX,
        y: clientY
      })

      // Move outer circle with slight delay
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      })
    }

    const onMouseHover = (e) => {
      const target = e.target
      
      // Check if hovering over clickable elements
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select') !== null

      if (isClickable) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          duration: 0.3
        })
        gsap.to(dotRef.current, {
          scale: 0,
          duration: 0.3
        })
      } else {
        gsap.to(cursorRef.current, {
          scale: 1,
          borderColor: '#78716c',
          backgroundColor: 'transparent',
          duration: 0.3
        })
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: '#f5f0e8',
          duration: 0.3
        })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseHover)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseHover)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-mute rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ transformOrigin: "center center" }}
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-text-main rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}

export default Cursor
