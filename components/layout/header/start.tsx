// src/components/layout/header/start.tsx

import { AlignLeft } from "lucide-react";
import { DynamicBreadcrumb } from "../DynamicBreadcrumb";
import { TriggerCustomIcon } from "../sidebar/custom/Trigger";
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar";


export default function HeaderStart() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  return (<div className="flex items-center gap-2">
    <TriggerCustomIcon className="md:hidden" icon={<AlignLeft />} />
    {!isMobile && (
      <>

      </>
    )}
          <Separator orientation="vertical" className="h-5 md:hidden"/>
          <DynamicBreadcrumb />
  </div>)
}