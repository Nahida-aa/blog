'use client'
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Tag } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card3DEffect } from './Card3DEffect'
import { Friend } from '@/app/aa/web/blog/types/friends'

export interface FriendCardProps {
  friend: Friend
}

export const FriendCard: React.FC<FriendCardProps> = React.memo(({ friend }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <Card3DEffect isFlipped={isFlipped} onClick={handleClick}>
      {(isHovering) => (
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
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent flex items-center px-2 ">
                <img src={friend.avatar} alt={friend.name} className={`size-12 rounded-full mr-3 `} />
                <h5 className="text-base font-bold text-white line-clamp-2 ">{friend.name}</h5>
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-center p-1 transition-opacity duration-300"
              style={{ opacity: isHovering ? 1 : 0 }}>
              {isFlipped ? (
                <div className='[transform:rotateY(180deg)] w-full '>
                  此功能在准备中...
                </div>
              ) : (
                <p className="text-sm text-white text-center mb-4">{friend.description}</p>
              )}
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
      )}
    </Card3DEffect>
  )
})

FriendCard.displayName = 'FriendCard'