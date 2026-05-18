"use client"

import { useState, useRef, useEffect } from "react"

export function AnimatedTitle({ text }: { text: string }) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [charPositions, setCharPositions] = useState<DOMRect[]>([])
  const [isWinking, setIsWinking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])

  const orbRadius = 80
  const displayText = isWinking ? text.replace(":)", ";)") : text
  const words = displayText.split(" ")

  // Toggle between :) and ;) every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWinking(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateCharPositions = () => {
      const positions = charRefs.current.map(ref => ref?.getBoundingClientRect() || new DOMRect())
      setCharPositions(positions)
    }
    updateCharPositions()
    window.addEventListener("resize", updateCharPositions)
    return () => window.removeEventListener("resize", updateCharPositions)
  }, [displayText])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePos(null)
  }

  const getCharEffect = (index: number) => {
    if (!mousePos || !charPositions[index]) return { inOrb: false, intensity: 0 }
    
    const charRect = charPositions[index]
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { inOrb: false, intensity: 0 }

    const charCenterX = charRect.left - containerRect.left + charRect.width / 2
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charCenterX, 2) + Math.pow(mousePos.y - charCenterY, 2)
    )

    if (distance < orbRadius) {
      const intensity = 1 - distance / orbRadius
      return { inOrb: true, intensity }
    }
    return { inOrb: false, intensity: 0 }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block w-full cursor-pointer select-none text-left"
    >
      <h1 className="flex flex-wrap items-baseline gap-x-3 text-left text-4xl font-bold leading-tight tracking-normal text-foreground lg:text-5xl">
        {words.map((word, wordIndex) => {
          const charsBeforeWord = words
            .slice(0, wordIndex)
            .reduce((count, previousWord) => count + previousWord.length, 0)

          return (
            <span key={`${word}-${wordIndex}`} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => {
                const index = charsBeforeWord + charIndex
                const { inOrb, intensity } = getCharEffect(index)

                const smoothIntensity = inOrb ? Math.pow(intensity, 0.5) : 0
                const scale = 1 + smoothIntensity * 0.4
                const glassColor = inOrb
                  ? `rgba(170, 220, 255, ${0.72 + smoothIntensity * 0.28})`
                  : undefined

                return (
                  <span
                    key={index}
                    ref={el => { charRefs.current[index] = el }}
                    className="relative inline-block"
                    style={{
                      transform: `scale(${scale})`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      zIndex: inOrb ? 10 : 1,
                    }}
                  >
                    {/* Base character - fades when in orb */}
                    <span
                      className="relative"
                      style={{
                        color: glassColor,
                        filter: inOrb
                          ? `drop-shadow(0 0 ${4 * smoothIntensity}px rgba(120, 205, 255, ${0.42 * smoothIntensity}))`
                          : "none",
                        textShadow: inOrb
                          ? `
                            0 0 ${3 * smoothIntensity}px rgba(225, 245, 255, ${0.55 * smoothIntensity}),
                            0 0 ${8 * smoothIntensity}px rgba(120, 205, 255, ${0.34 * smoothIntensity}),
                            0 1px ${2 * smoothIntensity}px rgba(255, 255, 255, ${0.28 * smoothIntensity})
                          `
                          : "none",
                        transition: "color 0.2s ease-out, filter 0.2s ease-out, text-shadow 0.2s ease-out",
                        WebkitTextStroke: inOrb
                          ? `${0.8 * smoothIntensity}px rgba(220, 245, 255, ${0.58 * smoothIntensity})`
                          : "0 transparent",
                      }}
                    >
                      {char}
                    </span>
                  </span>
                )
              })}
            </span>
          )
        })}
      </h1>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
