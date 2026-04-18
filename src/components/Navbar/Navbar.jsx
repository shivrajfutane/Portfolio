import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { PERSONAL_DETAILS } from '../../utils/constants'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const initials = PERSONAL_DETAILS.name.split(' ').map(n => n[0]).join('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const observers = []
    
    // Setup intersection observer for active link
    NAV_LINKS.forEach((link) => {
      const element = document.querySelector(link.href)
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(link.href.replace('#', ''))
            }
          },
          { threshold: 0.5 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach(obs => obs.disconnect())
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="text-2xl font-syne font-bold text-text-main hover:text-primary transition-colors"
          >
            {initials}<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-mono uppercase tracking-wider relative group py-2 ${
                  activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-text-main hover:text-primary'
                } transition-colors`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-text-main hover:text-primary transition-colors z-[60]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-[55] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                transitionDelay: isOpen ? `${idx * 100}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0
              }}
              className={`text-4xl font-syne font-bold uppercase transition-all duration-500 ${
                activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-text-main hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
