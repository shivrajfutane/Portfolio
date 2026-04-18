import React, { useState } from 'react'
import MagneticButton from '../UI/MagneticButton'
import { CONTACT_CONFIG } from '../../utils/constants'

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData(e.target)
    formData.append("access_key", CONTACT_CONFIG.web3FormsAccessKey)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus('error')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10 bg-background/50 backdrop-blur-md p-8 brutal-border rounded-xl">
      <div className="mb-6 relative group">
        <input 
          type="text" 
          id="name" 
          name="name" // Added name attribute
          required 
          className="peer w-full bg-transparent border-b-2 border-mute/50 py-3 text-text-main focus:outline-none focus:border-primary transition-colors placeholder-transparent"
          placeholder="Name"
        />
        <label 
          htmlFor="name" 
          className="absolute left-0 top-3 text-mute font-mono text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs"
        >
          Your Name
        </label>
      </div>

      <div className="mb-6 relative group">
        <input 
          type="email" 
          id="email" 
          name="email" // Added name attribute
          required 
          className="peer w-full bg-transparent border-b-2 border-mute/50 py-3 text-text-main focus:outline-none focus:border-primary transition-colors placeholder-transparent"
          placeholder="Email"
        />
        <label 
          htmlFor="email" 
          className="absolute left-0 top-3 text-mute font-mono text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs"
        >
          Your Email
        </label>
      </div>

      <div className="mb-8 relative group">
        <textarea 
          id="message" 
          name="message" // Added name attribute
          required 
          rows={4}
          className="peer w-full bg-transparent border-b-2 border-mute/50 py-3 text-text-main focus:outline-none focus:border-primary transition-colors resize-none placeholder-transparent"
          placeholder="Message"
        />
        <label 
          htmlFor="message" 
          className="absolute left-0 top-3 text-mute font-mono text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs"
        >
          Your Message
        </label>
      </div>

      <MagneticButton type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            Sending...
          </div>
        ) : status === 'success' ? (
          "Message Sent!"
        ) : status === 'error' ? (
          "Failed to send"
        ) : (
          "Send Message"
        )}
      </MagneticButton>
    </form>
  )
}

export default ContactForm
