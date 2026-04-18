import React from 'react'
import { ArrowUp } from 'lucide-react'
import { PERSONAL_DETAILS } from '../../utils/constants'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-mute/20 bg-background z-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="font-mono text-sm text-mute text-center md:text-left">
          &copy; {currentYear} {PERSONAL_DETAILS.name}. All rights reserved.<br />
          Built with <span className="text-primary hover:text-secondary transition-colors cursor-pointer">React</span> & <span className="text-primary hover:text-secondary transition-colors cursor-pointer">Three.js</span>
        </div>

        <button 
          onClick={scrollToTop}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-mute/30 text-text-main hover:border-primary hover:bg-primary/10 transition-all duration-300 pointer-events-auto cursor-none"
          aria-label="Back to top"
        >
          <ArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  )
}

export default Footer
