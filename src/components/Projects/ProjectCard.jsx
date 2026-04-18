import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { Code2, ExternalLink } from 'lucide-react'

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  
  const handleMouseMove = (e) => {
    if(!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Calculate rotation (-15 to 15 degrees max)
    const rotateX = -1 * (y / (rect.height / 2)) * 10
    const rotateY = (x / (rect.width / 2)) * 10
    
    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out"
    })
    
    // Parallax effect for image
    if(imageRef.current) {
      gsap.to(imageRef.current, {
        x: rotateY * -1,
        y: rotateX,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }
  
  const handleMouseLeave = () => {
    if(!cardRef.current) return
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    })
    
    if(imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
    }
  }

  return (
    <div 
      className="project-card perspective-1000 w-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-[#111] rounded-xl overflow-hidden border border-mute/20 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] flex flex-col h-full transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-opacity duration-500 scale-[2] -translate-x-full group-hover:translate-x-full ease-out" style={{ transition: 'all 1s ease' }} />

        {/* Project Image */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-zinc-900 border-b border-mute/20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111] z-10" />
          <img 
            ref={imageRef}
            src={project.image} 
            alt={project.title}
            className="w-full h-[120%] object-cover -translate-y-[10%]"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow z-10 bg-[#111]" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl font-syne font-bold text-text-main group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-mute font-mono text-sm leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-mono px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-8 pt-4 border-t border-mute/20">
            <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-mono text-text-main hover:text-primary transition-colors">
              <ExternalLink size={16} /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-mono text-text-main hover:text-primary transition-colors">
              <Code2 size={16} /> Source
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
