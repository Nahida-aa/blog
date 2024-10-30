"use client"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/lib/utils"
import { AlignLeft, PanelLeft } from "lucide-react"


interface TriggerCustomIconProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode
}
const TriggerCustomIcon = React.forwardRef<
  React.ElementRef<typeof Button>,
  TriggerCustomIconProps
>(({ className, onClick, icon = <PanelLeft />, ...props }, ref) => {
  const { toggleSidebar,state,open,openMobile } = useSidebar()
  // console.log(`TriggerCustomIcon: state=${state}, open=${open}, openMobile=${openMobile}`)
  return (<>
     
      <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 ", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
      >
        {icon}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>   
    
  </>)
})
TriggerCustomIcon.displayName = "TriggerCustomIcon"
export {TriggerCustomIcon}