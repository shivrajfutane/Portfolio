import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SectionTitle from '../UI/SectionTitle'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../utils/constants'

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const containerRef = useRef(null)

  const categories = ['All', 'Frontend', 'Backend', 'Fullstack']
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase() === filter.toLowerCase())

  useEffect(() => {
    // Reveal animation on scroll
    const cards = gsap.utils.toArray('.project-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      )
    })
  }, [])

  // Animate grid specifically when filter changes
  useEffect(() => {
    if(containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-card')
      gsap.fromTo(cards, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      )
    }
  }, [filter])

  return (
    <section className="min-h-screen py-24 container mx-auto px-6" id="projects">
      <SectionTitle title="Selected Works" />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-16 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 relative z-10 ${
              filter === cat 
              ? 'text-background font-bold' 
              : 'text-mute hover:text-text-main border border-mute/30'
            }`}
          >
            {filter === cat && (
              <span className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={`${project.id}-${filter}`} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
