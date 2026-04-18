import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SectionTitle from '../UI/SectionTitle'
import SkillBar from './SkillBar'
import { SKILLS } from '../../utils/constants'
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma, FaLinux
} from 'react-icons/fa'
import { 
  SiThreedotjs, SiTailwindcss, SiNextdotjs, SiGreensock, SiMongodb, SiCanva 
} from 'react-icons/si'
import { MdAnimation } from 'react-icons/md'

const getIcon = (name) => {
  const iconClass = "w-10 h-10 mb-3 text-mute group-hover:text-primary transition-colors duration-300 icon-svg";
  switch(name.toLowerCase()) {
    case 'react': return <FaReact className={iconClass} />;
    case 'three.js': return <SiThreedotjs className={iconClass} />;
    case 'tailwind css': return <SiTailwindcss className={iconClass} />;
    case 'next.js': return <SiNextdotjs className={iconClass} />;
    case 'gsap': return <SiGreensock className={iconClass} />;
    case 'anime js': return <MdAnimation className={iconClass} />;
    case 'node.js': return <FaNodeJs className={iconClass} />;
    case 'python': return <FaPython className={iconClass} />;
    case 'mongodb': return <SiMongodb className={iconClass} />;
    case 'docker': return <FaDocker className={iconClass} />;
    case 'git': return <FaGitAlt className={iconClass} />;
    case 'figma': return <FaFigma className={iconClass} />;
    case 'canva': return <SiCanva className={iconClass} />;
    case 'linux': return <FaLinux className={iconClass} />;
    default: return <div className={`bg-mute/20 rounded-full ${iconClass}`} />;
  }
}

const Skills = () => {
  const gridRef = useRef(null)

  useEffect(() => {
    const icons = gridRef.current.querySelectorAll('.skill-icon')
    
    gsap.fromTo(icons, 
      { opacity: 0, scale: 0 },
      {
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <section className="min-h-screen py-24 container mx-auto px-6" id="skills">
      <SectionTitle title="Core Arsenal" />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Col: Grid */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8">
            <h3 className="text-2xl font-syne text-primary uppercase mb-6 border-b border-mute/20 pb-2">Technologies</h3>
          </div>
          <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
            {SKILLS.frontend.concat(SKILLS.backend).concat(SKILLS.tools).slice(0, 12).map((skill, idx) => (
              <div 
                key={idx} 
                className="skill-icon aspect-square bg-[#111] brutal-border rounded-xl flex flex-col items-center justify-center p-4 text-center group cursor-none hover:bg-primary/10 hover:border-primary/50 transition-colors perspective-1000"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'back.out' })
                  gsap.to(e.currentTarget.querySelector('.icon-svg'), { 
                    rotateY: 180, 
                    scale: 1.2, 
                    duration: 0.6, 
                    ease: 'back.out' 
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'back.out' })
                  gsap.to(e.currentTarget.querySelector('.icon-svg'), { 
                    rotateY: 0, 
                    scale: 1, 
                    duration: 0.6, 
                    ease: 'back.out' 
                  })
                }}
              >
                {getIcon(skill.name)}
                <span className="font-mono text-sm group-hover:text-primary transition-colors select-none text-zinc-300 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Bars */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="mb-8">
            <h3 className="text-2xl font-syne text-primary uppercase mb-6 border-b border-mute/20 pb-2">Proficiency</h3>
          </div>
          {SKILLS.frontend.slice(0, 3).map((skill, idx) => (
            <SkillBar key={`f-${idx}`} label={skill.name} percentage={skill.level} />
          ))}
          {SKILLS.backend.slice(0, 3).map((skill, idx) => (
            <SkillBar key={`b-${idx}`} label={skill.name} percentage={skill.level} />
          ))}
          {SKILLS.tools.slice(0, 2).map((skill, idx) => (
            <SkillBar key={`t-${idx}`} label={skill.name} percentage={skill.level} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
