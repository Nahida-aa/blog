"use client"

import React, { useState, useEffect, useRef } from 'react'

export default function Component() {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovering])

  const calculateTransform = () => {
    if (!isHovering) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

    const card = cardRef.current
    if (!card) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.width / 2
    const cardCenterY = cardRect.height / 2
    const maxRotation = 10 // 最大旋转角度
    const maxDepression = 5 // 最大压力效果（以像素为单位）

    const rotateY = ((mousePosition.x - cardCenterX) / cardCenterX) * maxRotation
    const rotateX = -((mousePosition.y - cardCenterY) / cardCenterY) * maxRotation

    const distanceFromCenter = Math.sqrt(
      Math.pow(mousePosition.x - cardCenterX, 2) + Math.pow(mousePosition.y - cardCenterY, 2)
    )
    const maxDistance = Math.sqrt(Math.pow(cardCenterX, 2) + Math.pow(cardCenterY, 2))
    const depression = (1 - distanceFromCenter / maxDistance) * maxDepression

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1, 1, 1)
      translateZ(${-depression}px)
    `
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div
        ref={cardRef}
        className="size-64  rounded-xl shadow-xl transition-all duration-200 ease-out"
        style={{
          transform: calculateTransform(),
          transition: isHovering ? 'none' : 'all 0.5s ease',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setMousePosition({ x: 0, y: 0 })
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">3D Interactive Card</h2>
          <p className="text-gray-600">
            Move your mouse over this card to see the 3D interactive effect. The card will tilt and appear to be
            pressed down based on your mouse position.
          </p>
        </div>
      </div>
    </div>
  )
}