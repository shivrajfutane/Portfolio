import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { Award, ExternalLink } from 'lucide-react'

const CertificateCard = ({ certificate, index, onVerify }) => {
  const cardRef = useRef(null)
  
  return (
    <div 
      className="certificate-card group relative bg-[#111] rounded-xl overflow-hidden border border-mute/20 transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="p-6 flex flex-col h-full relative z-10">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
          <Award size={24} />
        </div>
        
        <h3 className="text-xl md:text-2xl font-syne font-bold text-text-main group-hover:text-primary transition-colors mb-2">
          {certificate.title}
        </h3>
        
        <p className="text-mute font-mono text-sm mb-4">
          {certificate.issuer}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-mute/20">
          <span className="text-xs font-mono font-bold tracking-widest text-secondary">
            {certificate.date}
          </span>
          <button 
            onClick={() => onVerify(certificate.image)}
            className="flex items-center gap-2 text-sm font-mono text-text-main hover:text-primary transition-colors cursor-pointer"
          >
            <ExternalLink size={16} /> Verify
          </button>
        </div>
      </div>
    </div>
  )
}

export default CertificateCard
