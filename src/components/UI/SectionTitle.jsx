import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SectionTitle = ({ title }) => {
  const lineRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      }
    )

    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <div className="relative inline-block mb-16" ref={titleRef}>
      <h2 className="text-4xl md:text-6xl font-syne font-bold text-text-main pr-8 pb-4">
        {title}
      </h2>
      <div 
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-1 bg-primary"
      />
    </div>
  )
}

export default SectionTitle
