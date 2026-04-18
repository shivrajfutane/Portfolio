import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mail, Code2, Briefcase } from 'lucide-react'
import { TunnelCanvas } from './TunnelCanvas'
import ContactForm from './ContactForm'
import { PERSONAL_DETAILS } from '../../utils/constants'

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isMobile ? (
          <Suspense fallback={<div className="w-full h-full bg-[#080501]" />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ antialias: false }}
            >
              <TunnelCanvas />
            </Canvas>
          </Suspense>
        ) : (
          <div className="w-full h-full bg-[#080501] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-syne font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Let's Build Something
          </h2>
          <p className="text-mute font-mono tracking-widest uppercase">Reach out and say hello</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-8 max-w-sm mx-auto lg:mx-0">
              <a 
                href={`mailto:${PERSONAL_DETAILS.email}`} 
                className="group flex items-center gap-6 p-6 brutal-border rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-mono text-sm text-mute uppercase mb-1">Email</div>
                  <div className="font-syne font-bold text-lg text-text-main group-hover:text-primary transition-colors">{PERSONAL_DETAILS.email}</div>
                </div>
              </a>

              <a 
                href={PERSONAL_DETAILS.github} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-6 p-6 brutal-border rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                  <Code2 size={24} />
                </div>
                <div>
                  <div className="font-mono text-sm text-mute uppercase mb-1">Code</div>
                  <div className="font-syne font-bold text-lg text-text-main group-hover:text-primary transition-colors">github.com/{PERSONAL_DETAILS.github.split('/').pop()}</div>
                </div>
              </a>

              <a 
                href={PERSONAL_DETAILS.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-6 p-6 brutal-border rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                  <Briefcase size={24} />
                </div>
                <div>
                  <div className="font-mono text-sm text-mute uppercase mb-1">Network</div>
                  <div className="font-syne font-bold text-lg text-text-main group-hover:text-primary transition-colors">Connect with me</div>
                </div>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
