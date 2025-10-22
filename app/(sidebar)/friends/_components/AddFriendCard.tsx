'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card3DEffect } from './Card3DEffect'
import { ExternalLink,Loader2,PlusCircle } from 'lucide-react'
import Link from 'next/link'

const jsonTemplate = `
{
  "name": "Friend's Name",
  "url": "https://friend-website.com",
  "avatar": "https://avatar-url.com/image.jpg",
  "desc": "A brief description"
}
`.trim()

interface AddFriendCardProps {
  onAddFriend: (newFriend: any) => void
}

export const AddFriendCard: React.FC<AddFriendCardProps> = ({ onAddFriend }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [jsonInput, setJsonInput] = useState(jsonTemplate)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    try {
      const newFriend = JSON.parse(jsonInput)
      await onAddFriend(newFriend)
      // setJsonInput('')
    } catch (error) {
      console.error('Invalid JSON input:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card3DEffect isFlipped={isFlipped} onClick={handleClick}>
      {(isHovering) => (
        <Card className="w-full h-full relative [transform-style:preserve-3d] overflow-hidden">
          <CardContent className="absolute w-full h-full flex flex-col justify-between p-0 [backface-visibility:hidden] overflow-hidden">
            <PlusCircle className={`absolute top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-1/2 text-white h-12 w-12 ${isFlipped ? 'hidden':''}`} />
            <div className="relative w-full h-full flex flex-col justify-between">

              <div className="absolute inset-0 bg-black transition-opacity duration-300" 
                style={{ opacity: isHovering ? 0.5 : 0, pointerEvents: 'none' }} />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent flex items-center px-2">
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-1 transition-opacity duration-300"
              style={{ opacity: isHovering ? 1 : 0 }}
              >
              {isFlipped ? (
                <div className='[transform:rotateY(180deg)] w-full '>
                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="flex-grow p-0 font-mono text-xs min-h-40"
                    onClick={(e) => e.stopPropagation()} // 阻止事件冒泡
                  />
                </div>
              ) : (<>
                  <div className='h-20 w-full'></div>
                  {/* <PlusCircle className={` h-12 w-12 ${isFlipped ? 'hidden':''} hidden`} /> */}
                  <p className="text-sm text-white text-center mt-4">Click to add a new friend</p>
                </>
              )}
              <div className='absolute top-0 w-full px-4 my-2 flex'>
                <Button  className={`[transform:rotateY(180deg)]  h-8 ${isFlipped ? '':'hidden'}`}  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFriend(e)
                  }}
                  >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
                </Button>
                <Link 
                  href={`/friends/add`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:underline flex items-center ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
                
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Card3DEffect>
  )
}