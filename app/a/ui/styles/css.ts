import { cn } from "@/lib/utils";

export const textDefault = cn('text-base [&_svg]:size-4 inline-flex items-center gap-1')
export const textSuccess = cn(textDefault, 'text-ctp-green')
export const textWarning = cn(textDefault, 'text-ctp-yellow')

export const buttonDefault = cn('bg-ctp-surface0 rounded-md h-9 px-1.5 flex items-center')