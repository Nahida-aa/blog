import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { DialogContentProps, DialogProps } from "@radix-ui/react-dialog"

interface Modal extends DialogProps {
  children: React.ReactNode
  content?: Omit<DialogContentProps, 'children'>
  className?: string
}
// const [open, setOpen] = useState(false)
export function Modal({ children, content, className
  , ...dialog }: Modal) {
  return (
    <Dialog {...dialog}>
      <DialogContent   {...content} className={cn('overflow-hidden', className)} aria-describedby='ModalDialog' >
        {children}
      </DialogContent>
    </Dialog>
  )
}
