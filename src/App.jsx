import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Cursor from './components/UI/Cursor'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Certificates from './components/Certificates/Certificates'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="relative w-full bg-background min-h-screen">
      <Loader />
      <Cursor />
      <Navbar />
      
      <main>
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="projects"><Projects /></div>
        <div id="skills"><Skills /></div>
        <div id="certificates"><Certificates /></div>
        <div id="contact"><Contact /></div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
