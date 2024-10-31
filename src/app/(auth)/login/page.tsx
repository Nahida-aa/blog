'use client'

import { motion } from 'framer-motion'
import { LoginForm } from './_comp/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100%-48px)] flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <LoginForm />
      </motion.div>
    </div>
  )
}