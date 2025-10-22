'use client'
import { Button } from '@/components/aui/button'
import type { HTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children, pendingText }: HTMLAttributes<HTMLButtonElement> & { pendingText?: string }) {
  const status = useFormStatus()
  return <Button type="submit" isLoading={status.pending} color="primary" >
    {
      (pendingText && status.pending) ? pendingText : children
    }
  </Button>
}