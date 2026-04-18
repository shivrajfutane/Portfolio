import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SectionTitle from '../UI/SectionTitle'
import CertificateCard from './CertificateCard'
import { CERTIFICATES } from '../../utils/constants'

const Certificates = () => {
  const containerRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const cards = gsap.utils.toArray('.certificate-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
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

  return (
    <section className="min-h-[70vh] py-24 container mx-auto px-6 border-t border-mute/10 bg-gradient-to-b from-background to-[#0f0a05]" id="certificates">
      <SectionTitle title="Certifications" />

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {CERTIFICATES.map((cert, index) => (
          <CertificateCard key={cert.id} certificate={cert} index={index} onVerify={setSelectedImage} />
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors text-sm font-bold font-mono tracking-widest cursor-pointer"
            >
              [CLOSE]
            </button>
            <img 
              src={selectedImage} 
              alt="Certificate Verification" 
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl border border-mute/20 shadow-2xl shadow-primary/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates
