import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SkillBar = ({ label, percentage }) => {
  const barRef = useRef(null)

  useEffect(() => {
    // Animate width 0 -> percentage
    gsap.fromTo(barRef.current,
      { width: 0 },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
        }
      }
    )
  }, [percentage])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2 font-mono text-sm tracking-widest">
        <span className="text-text-main uppercase">{label}</span>
        <span className="text-primary">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-mute/20 rounded-full overflow-hidden relative">
        <div 
          ref={barRef} 
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary relative"
        >
          {/* Shimmer line inside the fill */}
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  )
}

export default SkillBar
