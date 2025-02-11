import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br  w-full">
      <div className="max-w-6xl mx-auto mb-8 w-full flex-grow-0">
        <Skeleton className="h-[252px]">Loading...</Skeleton>
        
      </div>
    </div>
  )
}