import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SectionTitle from '../UI/SectionTitle'
import Terminal from './Terminal'
import Stats from './Stats'
import { PERSONAL_DETAILS, SKILLS } from '../../utils/constants'

const About = () => {
  const bioRef = useRef(null)
  
  useEffect(() => {
    // Word reveal animation
    if(bioRef.current) {
      const words = bioRef.current.querySelectorAll('.bio-word')
      gsap.fromTo(words, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 75%",
          }
        }
      )
    }

    // Floating chips
    const chips = document.querySelectorAll('.skill-chip')
    chips.forEach((chip, i) => {
      gsap.to(chip, {
        y: -10,
        yoyo: true,
        repeat: -1,
        duration: 2 + Math.random(),
        ease: "sine.inOut",
        delay: i * 0.2
      })
    })
  }, [])

  const bioText = `As a Full Stack Developer, I specialize in crafting immersive, high-performance web applications. I blend creative design with scalable engineering to build digital experiences that leave a lasting impact.`

  return (
    <section className="min-h-screen py-24 container mx-auto px-6" id="about">
      <SectionTitle title="About Me" />
      
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left Col: Image & Badge */}
        <div className="w-full lg:w-5/12 relative group">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden brutal-border z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
            <div className="absolute inset-0 bg-primary/20 mix-blend-color z-10 pointer-events-none" />
            <img 
              src={PERSONAL_DETAILS.profileImage} 
              alt={PERSONAL_DETAILS.name} 
              className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
          
          {/* Decorative background rect */}
          <div className="absolute top-4 -left-4 w-full h-full bg-secondary/10 rounded-lg -z-0" />
          
          {/* "Open to work" badge */}
          <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-background brutal-border p-4 rounded-full flex items-center gap-3 shadow-xl z-20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-mono text-sm uppercase tracking-wider font-bold">Open to Work</span>
          </div>
        </div>

        {/* Right Col: Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <p ref={bioRef} className="text-xl md:text-3xl leading-relaxed text-zinc-300 font-medium">
            {bioText.split(' ').map((word, i) => (
              <span key={i} className="bio-word inline-block mr-2 mt-2">{word}</span>
            ))}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {SKILLS.frontend.slice(0, 4).map((skill, i) => (
              <span key={i} className="skill-chip px-4 py-2 border border-primary/30 rounded-full font-mono text-sm bg-primary/5 text-primary shadow-sm shadow-primary/10">
                {skill.name}
              </span>
            ))}
          </div>

          <Terminal />
          <Stats />
        </div>
      </div>
    </section>
  )
}

export default About
