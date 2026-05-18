"use client"

import { useEffect, useRef } from "react"

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  depth: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dots: Dot[] = []
    let width = 0
    let height = 0
    let animationFrame = 0
    let scrollY = window.scrollY

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const targetCount = Math.min(95, Math.max(42, Math.floor((width * height) / 17000)))
      dots.length = 0

      for (let i = 0; i < targetCount; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: 1.1 + Math.random() * 2.2,
          depth: 0.35 + Math.random() * 0.95,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const backgroundGlow = ctx.createRadialGradient(
        width * 0.76,
        height * 0.2,
        0,
        width * 0.76,
        height * 0.2,
        Math.min(width, height) * 0.3
      )
      backgroundGlow.addColorStop(0, "rgba(54, 145, 230, 0.18)")
      backgroundGlow.addColorStop(0.5, "rgba(45, 112, 205, 0.08)")
      backgroundGlow.addColorStop(1, "rgba(45, 112, 205, 0)")
      ctx.fillStyle = backgroundGlow
      ctx.fillRect(0, 0, width, height)

      const mouse = mouseRef.current

      for (const dot of dots) {
        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const distance = Math.hypot(dx, dy)

        if (mouse.active && distance < 170) {
          const force = (1 - distance / 170) * dot.depth
          dot.vx += (dx / Math.max(distance, 1)) * force * 0.035
          dot.vy += (dy / Math.max(distance, 1)) * force * 0.035
        }

        dot.x += dot.vx * dot.depth
        dot.y += (dot.vy + (window.scrollY - scrollY) * 0.0008) * dot.depth
        dot.vx *= 0.985
        dot.vy *= 0.985

        if (dot.x < -20) dot.x = width + 20
        if (dot.x > width + 20) dot.x = -20
        if (dot.y < -20) dot.y = height + 20
        if (dot.y > height + 20) dot.y = -20
      }

      scrollY = window.scrollY

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j]
          const distance = Math.hypot(dot.x - other.x, dot.y - other.y)

          if (distance < 125) {
            ctx.strokeStyle = `rgba(74, 150, 225, ${0.24 * (1 - distance / 125)})`
            ctx.lineWidth = 1.15
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = `rgba(54, 130, 205, ${0.5 * dot.depth})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true }
    }

    const handlePointerLeave = () => {
      mouseRef.current.active = false
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  )
}
