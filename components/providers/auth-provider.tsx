'use client'
import { AuthSession } from "@/app/(auth)/auth"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type UpdateSession = (data?: any) => Promise<AuthSession | null | undefined>
type AuthContextType = {
  data: AuthSession | null | undefined
  update: UpdateSession
  status: string //'loading' | 'authenticated' | 'unauthenticated'
}

const AuthContext = createContext<AuthContextType>({
  data: null,
  update: async () => null,
  status: 'loading'
})

export const useAuthSession = () => {
  return useContext(AuthContext)
}

interface AuthSessionProviderProps {
  children: React.ReactNode
  session?: AuthSession | null
}
export const AuthSessionProvider = (props: AuthSessionProviderProps) => {
  const { children } = props

  // If session was `null`, there was an attempt to fetch it,
  // but it failed, but we still treat it as a valid initial value.
  // 翻译: 如果会话为 `null`，则尝试获取它，但(即使)失败了，但我们仍将其视为有效的初始值。
  const hasInitialSession = props.session !== undefined

  const [session, setSession] = useState(() => {
    return props.session
  })
  // If session was passed, initialize as not loading 
  // 翻译: 如果会话被传递，初始化为不加载
  const [loading, setLoading] = useState(!hasInitialSession)


  useEffect(() => {
    return () => {
    }
  }, [])

  const value = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
          ? "authenticated"
          : "unauthenticated",
      async update(data: any) {
        if (loading) return
        setLoading(true)
        // const newSession = await 
        const newSession = session
        setLoading(false)
        if (newSession) {
          setSession(newSession)
        }
        return newSession
      },
    }),
    [session, loading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}