// src/components/layout/header/start.tsx

import { AlignLeft } from "lucide-react";
import { DynamicBreadcrumb } from "../DynamicBreadcrumb";
import { TriggerCustomIcon } from "../sidebar/custom/Trigger";
import { Separator } from "@/components/ui/separator"

export default function HeaderStart() {
  return (<>
    <TriggerCustomIcon className="md:hidden" icon={<AlignLeft />} />
    <Separator orientation="vertical" className="h-5 md:hidden"/>
    <DynamicBreadcrumb />
  </>)
}