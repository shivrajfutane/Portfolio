import React, { useEffect, useRef, useState } from 'react'
import { PERSONAL_DETAILS } from '../../utils/constants'

const Terminal = () => {
  const lines = [
    `> ${PERSONAL_DETAILS.title}.`,
    `> Builder of fast, beautiful apps.`,
    `> ${PERSONAL_DETAILS.funFact}`
  ]

  const [displayedText, setDisplayedText] = useState(['', '', ''])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const terminalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentLine === 0 && currentChar === 0) {
          startTyping()
        }
      },
      { threshold: 0.5 }
    )

    if (terminalRef.current) observer.observe(terminalRef.current)

    return () => observer.disconnect()
  }, [])

  const startTyping = () => {
    let lineIdx = 0
    let charIdx = 0
    let texts = ['', '', '']; 
    setDisplayedText([...texts])
    
    // Simulate typing
    const interval = setInterval(() => {
      if (lineIdx >= lines.length) {
        clearInterval(interval)
        return
      }

      texts[lineIdx] += lines[lineIdx][charIdx]
      setDisplayedText([...texts])

      charIdx++
      if (charIdx >= lines[lineIdx].length) {
        lineIdx++
        charIdx = 0
      }
    }, 50)
  }

  return (
    <div ref={terminalRef} className="w-full bg-[#111] brutal-border rounded-md p-4 sm:p-6 mt-8 shadow-xl font-mono text-sm sm:text-base text-zinc-300">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      
      <div className="space-y-2 min-h-[100px]">
        {lines.map((_, i) => (
          <div key={i} className="min-h-[24px]">
            {displayedText[i]}
            {currentLine === i && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />}
            {displayedText[i] === lines[i] && i === 2 && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Terminal
