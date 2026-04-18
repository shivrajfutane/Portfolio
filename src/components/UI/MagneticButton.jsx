import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const MagneticButton = ({ children, className, variant = "primary", ...props }) => {
  const buttonRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = button.getBoundingClientRect()
      
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)

      // Only magnetic if close enough
      const distance = Math.sqrt(x * x + y * y)
      
      if (distance < 100) {
        gsap.to(button, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-mono font-medium rounded-sm group transition-colors duration-300 pointer-events-auto cursor-pointer"
  
  const variants = {
    primary: "bg-primary text-background hover:bg-glow focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
    ghost: "bg-transparent text-primary border border-primary/50 hover:bg-primary/10"
  }

  return (
    <div className="inline-block relative">
      <button 
        ref={buttonRef} 
        className={`${baseClasses} ${variants[variant]} ${className || ''}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        )}
      </button>
    </div>
  )
}

export default MagneticButton
