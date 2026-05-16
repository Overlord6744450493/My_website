"use client"

import { useState, useRef, useEffect } from "react"

export function AnimatedTitle({ text }: { text: string }) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [charPositions, setCharPositions] = useState<DOMRect[]>([])
  const [isWinking, setIsWinking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])

  const orbRadius = 80

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
  }, [text])

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

  // Replace :) with ;) when winking
  const displayText = isWinking ? text.replace(":)", ";)") : text

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
      className="relative cursor-pointer select-none"
    >
      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {text.split("").map((char, index) => {
          const { inOrb, intensity } = getCharEffect(index)
          
          const smoothIntensity = inOrb ? Math.pow(intensity, 0.5) : 0
          const scale = 1 + smoothIntensity * 0.4
          
          return (
            <span
              key={index}
              ref={el => { charRefs.current[index] = el }}
              className="inline-block relative"
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
                  opacity: inOrb ? 1 - smoothIntensity * 0.7 : 1,
                  transition: "opacity 0.2s ease-out",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>

              {/* Per-character glass effect - wraps around each letter */}
              {inOrb && char !== " " && (
                <span
                  className="absolute inset-0 z-20 overflow-visible"
                  style={{
                    transition: "all 0.2s ease-out",
                  }}
                >
                  {/* Glass text overlay - follows character shape */}
                  <span
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        145deg,
                        rgba(180, 220, 255, ${0.15 + smoothIntensity * 0.25}) 0%,
                        rgba(140, 200, 255, ${0.1 + smoothIntensity * 0.2}) 40%,
                        rgba(100, 180, 255, ${0.15 + smoothIntensity * 0.25}) 100%
                      )`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      filter: `blur(${smoothIntensity * 0.3}px)`,
                    }}
                  >
                    {char}
                  </span>

                  {/* Refraction highlight - top edge */}
                  <span
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        180deg,
                        rgba(255, 255, 255, ${0.3 * smoothIntensity}) 0%,
                        transparent 40%
                      )`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {char}
                  </span>

                  {/* Subtle glow around character edges */}
                  <span
                    className="absolute inset-0"
                    style={{
                      textShadow: `
                        0 0 ${4 * smoothIntensity}px rgba(140, 200, 255, ${0.3 * smoothIntensity}),
                        0 0 ${8 * smoothIntensity}px rgba(100, 180, 255, ${0.15 * smoothIntensity}),
                        0 1px ${2 * smoothIntensity}px rgba(255, 255, 255, ${0.2 * smoothIntensity})
                      `,
                      color: "transparent",
                      WebkitTextStroke: `${0.5 * smoothIntensity}px rgba(180, 220, 255, ${0.2 * smoothIntensity})`,
                    }}
                  >
                    {char}
                  </span>

                  {/* Pixel distortion overlay - very subtle, per character */}
                  {intensity > 0.4 && (
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(
                          135deg,
                          transparent 0%,
                          rgba(100, 180, 255, ${0.08 * smoothIntensity}) 50%,
                          transparent 100%
                        )`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        animation: intensity > 0.6 ? "shimmer 1.5s ease-in-out infinite" : "none",
                      }}
                    >
                      {char}
                    </span>
                  )}
                </span>
              )}
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
