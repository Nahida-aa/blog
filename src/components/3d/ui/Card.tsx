"use client"
import { useState, useEffect, useRef, useMemo } from 'react'

export const use3DEffect = (isHovering: boolean) => {
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
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  const transform = useMemo(() => {
    if (!isHovering) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    const card = cardRef.current
    if (!card) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

    const { width, height } = card.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2
    const maxRotation = 15 // 最大旋转角度
    const maxDepression = 10 // 最大压力效果（以像素为单位）

    const rotateY = ((mousePosition.x - centerX) / centerX) * maxRotation
    const rotateX = -((mousePosition.y - centerY) / centerY) * maxRotation

    const distanceFromCenter = Math.sqrt(
      Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
    )
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
    const depression = (1 - distanceFromCenter / maxDistance) * maxDepression

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1, 1, 1)
      translateZ(${-depression}px)
    `
  }, [isHovering, mousePosition])

  return { cardRef, transform, setMousePosition }
}


import { motion } from 'framer-motion'

interface A3DCardProps {
  children: React.ReactNode 
  enablePressureEffect?: boolean
  enableFlipEffect?: boolean
  className?: string
}

export const A3DCard: React.FC<A3DCardProps> = ({
  children,
  enablePressureEffect = true,
  enableFlipEffect = false,
  className = '',
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const { cardRef, transform, setMousePosition } = use3DEffect(isHovering && enablePressureEffect)

  const handleMouseEnter = () => {
    // console.log('handleMouseEnter')
    setIsHovering(true)
    setIsLeaving(false)
  }

  const handleMouseLeave = () => {
    // console.log('handleMouseLeave')
    setIsLeaving(true)
    setTimeout(() => {
      setIsHovering(false)
      setIsLeaving(false)
      setMousePosition({ x: 0, y: 0 })
    }, 1000) // 保留1秒
  }

  const handleCardClick = () => {
    if (enableFlipEffect) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`cursor-pointer relative transition-all duration-500 ${className}`}
      style={{
        willChange: 'transform',
        transformOrigin: 'center center',
      } as React.CSSProperties}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        width: 'var(--card-width)',
        transform: isFlipped ? `${transform} rotateY(180deg)` : transform,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}