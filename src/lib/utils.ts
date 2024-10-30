import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// 好像
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
