import type { JSX } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";

export const BetterTooltip = ({
  content,
  children,
  delayDuration = 0,
  align = "center",
  side = "top",
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<typeof Tooltip> & {
  content: JSX.Element | string | number;
  align?: "center" | "end" | "start";
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip {...props}>
        {/* button */}
        <TooltipTrigger asChild>
          <div className={cn("flex items-center justify-center", className)}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="bg-accent text-accent-foreground"
          align={align}
          side={side}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
