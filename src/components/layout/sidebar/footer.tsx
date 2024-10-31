import { ChevronsUpDown, User2 } from "lucide-react"
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import  ClientUser  from "@/components/aa/User/client"
import { Button } from "@/components/ui/button"
// import AuthButtonWithSessionProvider from "@/components/aa/auth/github/button/client"
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'

export default function SidebarFooterA() {
  // const session = await auth()
  const { state } = useSidebar()
  const { data: session } = useSession()
  return (<SidebarFooter className="p-0 gap-0">
    <SidebarMenu className="p-2">
      <SidebarTrigger className='size-8 p-2 group-data-[collapsible=icon]:flex hidden' />
      </SidebarMenu>
      <SidebarMenu className="p-1">
      {/* <SidebarMenuItem> */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="p-1">
            <SidebarMenuButton className="h-10 !p-[3px] group-data-[collapsible=icon]:!p-[3px] group-data-[collapsible=icon]:!size-10">
              <ClientUser className="size-8" />
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onSelect={session ? () => signOut() : () => signIn('github')}>
              <span>{session ? 'Sign out' : 'Sign in with GitHub'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {/* </SidebarMenuItem> */}
      </SidebarMenu>
  </SidebarFooter>
  )
}