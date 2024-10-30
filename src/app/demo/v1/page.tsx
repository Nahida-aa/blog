"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import { Friend } from '@/app/(blog)/md/blog/blog/types/friends'

const testFriend = {
  id: 1,
  name: "Test Friend",
  url: "https://test-friend.com",
  avatar: "https://avatars.githubusercontent.com/u/96083926?v=4",
  description: "This is a test friend for testing the FriendCard component."
}

const use3DEffect = (isHovering: boolean) => {
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
    if (!isHovering) return 'none'
    const card = cardRef.current
    if (!card) return 'none'

    const { width, height } = card.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2
    
    // Calculate normalized position (-1 to 1)
    const normalizedX = (mousePosition.x - centerX) / centerX
    const normalizedY = (mousePosition.y - centerY) / centerY
    
    // Apply sine function for smooth, limited rotation
    const maxRotation = 10 // Reduced from 15 to 10
    const rotateY = Math.sin(normalizedX * Math.PI / 2) * maxRotation
    const rotateX = -Math.sin(normalizedY * Math.PI / 2) * maxRotation
    
    // Calculate depression based on distance from center
    const distance = Math.sqrt(normalizedX ** 2 + normalizedY ** 2)
    const maxDepression = 5 // Reduced from 10 to 5
    const depression = (1 - Math.min(distance, 1)) * maxDepression

    // Add a small transition delay to smooth out sudden changes
    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(${-depression}px)
      transition: transform 0.1s ease-out
    `
  }, [isHovering, mousePosition])

  return { cardRef, transform }
}

interface FriendCardProps {
  friend: Friend
}

const FriendCard: React.FC<FriendCardProps> = React.memo(({ friend }) => {
  const [isHovering, setIsHovering] = useState(false)
  const { cardRef, transform } = use3DEffect(isHovering)

  return (
    <motion.div
      ref={cardRef}
      className="w-48 h-64 cursor-pointer relative transition-all duration-500"
      style={{
        '--card-width': isHovering ? '16rem' : '12rem',
        '--image-height': isHovering ? '100%' : 'calc(100% - 4rem)',
        willChange: 'transform',
        transformOrigin: 'center center',
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        width: 'var(--card-width)',
        transform: transform,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-full relative [transform-style:preserve-3d] overflow-hidden">
        <CardContent className="absolute w-full h-full flex flex-col justify-between p-0 [backface-visibility:hidden] overflow-hidden">
          <div className="relative w-full h-full flex flex-col justify-between">
            <img 
              src={friend.avatar} 
              alt={friend.name} 
              className="w-full object-cover transition-all duration-500"
              style={{ height: 'var(--image-height)' }}
            />
            <div className="absolute inset-0 bg-black transition-opacity duration-300" 
                 style={{ opacity: isHovering ? 0.5 : 0, pointerEvents: 'none' }} />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent flex items-center px-4">
              <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
              <h3 className="text-lg font-bold text-white truncate">{friend.name}</h3>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 transition-opacity duration-300"
               style={{ opacity: isHovering ? 1 : 0 }}>
            <p className="text-sm text-white text-center mb-4">{friend.description}</p>
            <a 
              href={friend.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:underline flex items-center absolute top-4 right-4"
              onClick={(e) => e.stopPropagation()}
            >
              Visit <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

FriendCard.displayName = 'FriendCard'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Test FriendCard Component</h1>
      <div className="flex justify-center">
        <FriendCard friend={testFriend} />
      </div>
    </div>
  )
}