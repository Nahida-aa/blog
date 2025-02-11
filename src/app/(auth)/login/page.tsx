import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import LoginForm from './_comp/LoginForm'
import GithubAuthButton from "@/components/auth/Button"
import { Background } from '@/app/(sidebar)/docs/Background';

const LoginPage = () => {
  
  return (<main className="min-h-[calc(100%-48px)] flex flex-col items-center justify-center bg-opacity-0 ">
    <Card
      className="border-none z-10" 
    >
      <CardContent className="flex flex-col items-center justify-center p-4 w-64">
        <LoginForm />
        <div className="flex items-center justify-between my-4 w-full">
          <hr className="w-5/12 border-gray-300" />
          <span className="text-gray-500">or</span>
          <hr className="w-5/12 border-gray-300" />
        </div>
        <GithubAuthButton />
      </CardContent>
    </Card>
    <Background />
  </main>)
}

export default LoginPage