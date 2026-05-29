"use client"

import React, { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Cursor coordinates references
  const mouseRef = useRef({ x: -100, y: -100 })
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if the user is on a touch device
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsMobile(hasTouch)
    if (hasTouch) return

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Lerp loop for trailing outer circle
    let currentX = -100
    let currentY = -100
    let animFrameId: number

    const tick = () => {
      const targetX = mouseRef.current.x
      const targetY = mouseRef.current.y

      // Instantly position the primary small dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      }

      // Smoothly interpolate the trailing ring (15% step per frame)
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      animFrameId = requestAnimationFrame(tick)
    }

    animFrameId = requestAnimationFrame(tick)

    // Highlight cursor on interactive nodes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animFrameId)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  if (isMobile || !isVisible) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, [role="button"], input, select, textarea, .clickable, [style*="cursor: pointer"] {
            cursor: none !important;
          }
        }
      `}} />
      {/* Lagging Trailing Ring (detector layout) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/45 pointer-events-none z-[9998] -mt-4 -ml-4 transition-all duration-300 ease-out"
        style={{
          backgroundColor: isHovered ? "rgba(120, 252, 214, 0.08)" : "transparent",
          borderColor: isHovered ? "hsl(var(--primary))" : "rgba(120, 252, 214, 0.45)",
          boxShadow: isHovered ? "0 0 15px rgba(120, 252, 214, 0.3)" : "none",
          transform: "translate3d(-100px, -100px, 0)"
        }}
      />
      {/* Primary Tiny Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] -mt-0.75 -ml-0.75"
        style={{
          transform: "translate3d(-100px, -100px, 0)"
        }}
      />
    </>
  )
}
