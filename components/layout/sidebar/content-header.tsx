import { Button } from "@/components/ui/button"
import { SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Check, ChevronDown, ChevronRight, FileUser, LogIn, MessageCircle, Milestone, PencilLine, QrCode, Settings, ShipWheel, X } from "lucide-react"
import NextImage from 'next/image'
import { UserMeta } from "@/types/user";
// import { ShadcnAvatar } from '@/components/common/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const ASidebarContentHead = ({ user }: { user?: UserMeta }) => {
  const img_src = user?.image ?? `https://avatar.vercel.sh/Guest`
  const view_name = user?.nickname ?? user?.name ?? 'Guest';
  
  const router = useRouter();
  return  <section className=''>
  <div className='flex gap-2 my-1.5 mx-3' >
    <NextImage src={img_src} width={56} height={56} alt={view_name} fill={false} className={`rounded-full size-14`} onClick={()=>{
      if (user) router.push(`/${user.name}`);
    }}/>
    {user ? (<>
      <SidebarMenu className=' gap-0 h-[min-count]'>
        <SidebarMenuItem className='h-5'>
          <SidebarMenuButton className='h-5' onClick={() => router.push(`/${user.name}`)}
          >
            <span>{user.nickname ? user.nickname : user.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className='h-5'>
          <SidebarMenuButton className='h-5 justify-between'>
            <span>todo</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className='h-5'>
          <SidebarMenuButton className='h-5'>
            <span className='flex items-center gap-1 opacity-50'><PencilLine className='size-3 opacity-50' />describes</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <section className='w-auto h-[3.75rem] justify-between flex flex-col items-end'>
        <DropdownMenu>
          <DropdownMenuTrigger className='text-xs h-4 top-0' asChild>
            <Button variant='ghost' className='p-1'>
            <span className='flex items-center gap-1 opacity-75'>switchAccount<ChevronDown className='size-3 opacity-75 ' /></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant='ghost' size='icon' className=' p-0 m-0 gap-0 size-6 [&amp;>svg]:size-6 [&amp;_svg]:size-6'>
          <QrCode className='size-6 opacity-75 hover:bg-accent focus-visible:ring-2' onClick={
            (e) => {
              e.preventDefault();
              console.log('qr-code');
              // router.push('/qr-code');
            }
          } />
        </Button>
      </section>
      </>) : (
      <SidebarMenu className='gap-0 bg-sidebar-accent/75 rounded-md'>
        <SidebarMenuItem>
          <SidebarMenuButton className='rounded-b-none justify-between'
            onClick={(e) => {
              e.preventDefault();
              router.push('/login');
            }}
          >
            <span className='flex items-center gap-2'><LogIn className='opacity-50 size-4' /><span className=''>Sign In</span></span><ChevronRight className='opacity-50' />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton className='rounded-t-none justify-between'>
            <span className='flex items-center gap-2'><QrCode className='opacity-50 size-4' /><span className=''>QR Code SignIn
              </span></span><ChevronRight className='opacity-50' />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )}
  </div>
</section>
}