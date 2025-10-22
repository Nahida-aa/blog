'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { RotatingCube } from '@/components/3d/RotatingCube'
import { A3DCard } from '@/components/3d/ui/Card'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log(data)
  }

  return (
    <div className=" min-h-[calc(100%-48px)] flex items-center justify-center relative overflow-hidden">
      
      {/* <RotatingCube /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <A3DCard enablePressureEffect={true} enableFlipEffect={true}>
          
        <form onSubmit={handleSubmit(onSubmit)} className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
          <div className="space-y-4">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50  placeholder:text-slate-500 text-slate-700"
                onClick={(e) => {
                  e.stopPropagation()}}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 placeholder:text-slate-500 text-slate-700"
                onClick={(e) => {
                  e.stopPropagation()}}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
              onClick={(e) => {
                e.stopPropagation()}}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
        </form>
        </A3DCard>
      </motion.div>
    </div>
  )
}