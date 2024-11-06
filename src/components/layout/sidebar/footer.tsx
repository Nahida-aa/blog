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
import { AuthModal } from "@/components/auth/AuthModal"
import { useEffect, useState } from "react"

export default function SidebarFooterA() {
  // const session = await auth()
  const { state } = useSidebar()
  const { data: session, status } = useSession();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // useEffect(() => {
  //   console.log('status:', status);
  //   setIsAuthenticated(status === 'authenticated');
  // }, [status]);
  return (<SidebarFooter className="p-0 gap-0">
    <SidebarMenu className="p-2">
      <SidebarTrigger className='size-8 p-2 group-data-[collapsible=icon]:flex hidden' />
      </SidebarMenu>
      <SidebarMenu className="p-1">
      {/* <SidebarMenuItem> */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="p-1">
            <SidebarMenuButton className="h-10 !p-[3px] group-data-[collapsible=icon]:!p-[3px] group-data-[collapsible=icon]:!size-10">
              <ClientUser className="size-8"  />
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {session ? (
              <>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => signOut()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </>
            ) : (
              <AuthModal>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <span>Sign in / Sign up</span>
                </DropdownMenuItem>
              </AuthModal>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      {/* </SidebarMenuItem> */}
      </SidebarMenu>
  </SidebarFooter>
  )
}