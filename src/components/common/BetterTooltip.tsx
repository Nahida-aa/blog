import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const BetterTooltip = ({
  content,
  children, 
  align = 'center',
  ...props
}: React.ComponentPropsWithoutRef<typeof Tooltip> & {
  content: JSX.Element | string;
  align?: 'center' | 'end' | 'start';
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};