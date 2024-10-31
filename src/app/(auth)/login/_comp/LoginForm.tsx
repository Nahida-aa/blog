import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginTypeSelect } from './LoginTypeSelect'
import { VerifyTypeSelect } from './VerifyTypeSelect'
import { ThirdPartyLogin } from './ThirdPartyLogin'

const formSchema = z.object({
  loginType: z.enum(['email', 'username']),
  loginValue: z.string().min(1, 'This field is required'),
  verifyType: z.enum(['password', 'emailCode']),
  verifyValue: z.string().min(1, 'This field is required'),
})

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [loginType, setLoginType] = useState<'email' | 'username'>('username')
  const [verifyType, setVerifyType] = useState<'password' | 'emailCode'>('password')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginType: 'username',
      verifyType: 'password',
    },
  })

  const watchLoginType = watch('loginType')

  useEffect(() => {
    if (watchLoginType === 'username') {
      setValue('verifyType', 'password')
      setVerifyType('password')
    }
  }, [watchLoginType, setValue])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCodeSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setIsCodeSent(false)
      setCountdown(60)
    }
    return () => clearTimeout(timer)
  }, [isCodeSent, countdown])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(`login`)
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log(data)
  }

  const handleSendCode = async () => {
    setIsSendingCode(true)
    // Simulate sending email code
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSendingCode(false)
    setIsCodeSent(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl">
      <ThirdPartyLogin />
      <div className="space-y-4 mt-4">
        <div className="flex space-x-2">
          <LoginTypeSelect control={control} setLoginType={setLoginType} setValue={setValue} />
          <Controller
            name="loginValue"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={loginType === 'email' ? 'email' : 'text'}
                placeholder={loginType === 'email' ? 'Email' : 'Username'}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 placeholder:text-slate-500 text-slate-700"
              />
            )}
          />
        </div>
        {errors.loginValue && <p className="text-red-500 text-sm mt-1">{errors.loginValue.message}</p>}
        
        <div className="flex space-x-2">
          <VerifyTypeSelect control={control} loginType={loginType} setVerifyType={setVerifyType} />
          <div className="flex-1 flex space-x-2">
            <Controller
              name="verifyValue"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={verifyType === 'password' ? 'password' : 'text'}
                  placeholder={verifyType === 'password' ? 'Password' : 'Email Code'}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 placeholder:text-slate-500 text-slate-700"
                />
              )}
            />
            {verifyType === 'emailCode' && (
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={isSendingCode || isCodeSent}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition"
              >
                {isSendingCode ? 'Sending...' : isCodeSent ? `Sent (${countdown}s)` : 'Send Code'}
              </Button>
            )}
          </div>
        </div>
        {errors.verifyValue && <p className="text-red-500 text-sm mt-1">{errors.verifyValue.message}</p>}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </div>
    </form>
  )
}