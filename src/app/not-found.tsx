'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Component() {
  const [wobble, setWobble] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setWobble(1)
      setTimeout(() => setWobble(0), 1000)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-4">
        <Button
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => setWobble(1)}
        >
          摸摸小猫咪
        </Button>
      <motion.div
        animate={{ rotate: wobble ? [0, -5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <span className="text-8xl mb-8 inline-block">🐱</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-purple-800 mb-4">喵呜~ 页面不见了！</h1>
        <p className="text-xl text-purple-600 mb-8">
          看起来我们的小猫咪把这个页面藏起来了。别担心，我们一起找找吧！
        </p>
      </motion.div>
      <div className="space-y-4">
        <Button
          asChild
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Link href="/">
            回到首页寻找小猫咪
          </Link>
        </Button>

        <Button
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => router.back()}
        >
          返回上一页
        </Button>
      </div>
    </div>
  )
}