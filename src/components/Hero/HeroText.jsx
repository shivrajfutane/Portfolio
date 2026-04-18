import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { PERSONAL_DETAILS } from '../../utils/constants'
import MagneticButton from '../UI/MagneticButton'

export const HeroText = () => {
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const btnsRef = useRef(null)

  useEffect(() => {
    // Wait for the loader to finish (apx 2.5s given the fake progress)
    const tl = gsap.timeline({ delay: 3 })
    
    // Animate name chars
    const chars = nameRef.current.querySelectorAll('.char')
    tl.fromTo(chars, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" }
    )
    .fromTo(titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(taglineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    )
    .fromTo(btnsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.2"
    )

    // Glitch effect on name
    const glitchInterval = setInterval(() => {
      gsap.to(nameRef.current, {
        x: () => Math.random() * 10 - 5,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "rough"
      })
    }, 4000)

    return () => clearInterval(glitchInterval)
  }, [])

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))
  }

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-20 pointer-events-none">
      <div className="pointer-events-auto">
        <h1 
          ref={nameRef}
          className="text-5xl md:text-8xl lg:text-9xl font-syne font-bold overflow-hidden"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          {splitText(PERSONAL_DETAILS.name)}
        </h1>
        
        <h2 
          ref={titleRef}
          className="text-xl md:text-3xl text-primary font-mono mt-4 opacity-0 uppercase tracking-widest"
        >
          {PERSONAL_DETAILS.title}
        </h2>
        
        <p 
          ref={taglineRef}
          className="text-mute text-lg md:text-xl max-w-lg mx-auto mt-6 opacity-0"
        >
          {PERSONAL_DETAILS.tagline}
        </p>

        <div ref={btnsRef} className="flex flex-wrap items-center justify-center gap-6 mt-10 opacity-0 relative z-20 pointer-events-auto">
          <MagneticButton onClick={handleScrollToProjects}>
            View My Work
          </MagneticButton>
          <a href={PERSONAL_DETAILS.resume} target="_blank" rel="noreferrer" className="inline-block">
            <MagneticButton variant="ghost">
              Download CV
            </MagneticButton>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-mute pointer-events-none">
        <ChevronDown size={32} />
      </div>
    </div>
  )
}
