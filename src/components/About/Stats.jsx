import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_DETAILS } from '../../utils/constants'

const Stats = () => {
  const statsRef = useRef(null)

  useEffect(() => {
    const statElements = statsRef.current.querySelectorAll('.stat-num')
    
    statElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'))
      
      gsap.to(el, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        }
      })
    })
  }, [])

  const statsList = [
    { label: "Projects", value: PERSONAL_DETAILS.stats.projects },
    { label: "Years Exp.", value: PERSONAL_DETAILS.stats.experience },
    { label: "Coffees/day", value: PERSONAL_DETAILS.stats.coffees },
  ]

  return (
    <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-mute/20">
      {statsList.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center sm:items-start">
          <div className="text-3xl sm:text-5xl font-syne font-bold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary mb-2">
            <span className="stat-num" data-target={stat.value}>0</span>+
          </div>
          <div className="text-sm sm:text-base font-mono text-mute uppercase tracking-widest text-center sm:text-left">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stats
