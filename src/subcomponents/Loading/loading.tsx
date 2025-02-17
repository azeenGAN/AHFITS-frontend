import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Main heading skeleton */}
      <div className="mb-12">
        <Skeleton className="h-16 w-3/4 max-w-3xl mx-auto" />
      </div>

      {/* Products container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="relative border border-border p-4 space-y-4"
            >
              {/* Product image skeleton */}
              <Skeleton className="aspect-square w-full rounded-none bg-muted-foreground/5 dark:bg-muted-foreground/20" />

              {/* Product details */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                
                {/* Sizes skeleton */}
                <div className="py-2">
                  <Skeleton className="h-4 w-full" />
                </div>
                
                {/* Price skeleton */}
                <Skeleton className="h-6 w-1/4" />
                
                {/* See link skeleton */}
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
  )
}

export default Loading
