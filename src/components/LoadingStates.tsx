import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LeadCardSkeleton = () => (
  <Card className="p-8 bg-gradient-card backdrop-blur-xl border-border/20 shadow-glass animate-pulse">
    <div className="flex items-center space-x-6">
      <div className="relative">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full" />
      </div>
      
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
        
        <div className="flex items-center gap-3">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  </Card>
)

export const StatsCardSkeleton = () => (
  <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/20 shadow-glass animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-11 w-11 rounded-xl" />
    </div>
  </Card>
)

export const LeadStatsLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {Array.from({ length: 8 }).map((_, index) => (
      <StatsCardSkeleton key={index} />
    ))}
  </div>
)

export const LeadListLoading = () => (
  <div className="grid gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <LeadCardSkeleton key={index} />
    ))}
  </div>
)