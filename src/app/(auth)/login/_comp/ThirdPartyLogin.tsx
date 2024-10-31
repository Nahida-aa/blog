// import { signIn } from '@/auth'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export const ThirdPartyLogin = () => {
  const providers = [
    {
      name: 'GitHub',
      onClick:  () => {console.log('GitHub login')
        signIn('github')
      },
    },
    {
      name: 'Google',
      onClick: () => console.log('Google login'),
    },
    {
      name: 'Facebook',
      onClick: () => console.log('Facebook login'),
    },
  ]
  return (
    <div className="space-x-2 flex">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          type="button"
          onClick={provider.onClick}
          className="w-full p-2 font-semibold rounded-lg shadow-md focus:outline-none transition "
        >
          use {provider.name}
        </Button>
      ))}
    </div>
  )
}