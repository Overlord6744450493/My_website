"use client"

import { ElementType, useEffect, useRef, useState } from "react"

type LetterRevealProps = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

export function LetterReveal({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  stagger = 28,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <Component ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          className={`letter-reveal-char ${isVisible ? "letter-reveal-char-visible" : ""}`}
          style={{ transitionDelay: `${delay + index * stagger}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Component>
  )
}
