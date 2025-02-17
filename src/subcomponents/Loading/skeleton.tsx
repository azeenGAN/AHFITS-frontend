import { Skeleton } from "@/components/ui/skeleton"

export default function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
    {/* Loading indicator at the top */}
    <div className="bg-primary/10 dark:bg-primary/20 overflow-hidden">
      <div className="h-1 w-full bg-primary/20 dark:bg-primary/30">
        <div className="h-1 w-1/3 bg-primary animate-[loading_1s_ease-in-out_infinite]"></div>
      </div>
    </div>

    {/* Additional skeleton lines */}
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>

    {/* Header */}
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <nav className="hidden md:flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </nav>
        <Skeleton className="h-10 w-24" />
      </div>
    </header>

    {/* Hero Section */}
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
        <Skeleton className="h-12 w-48 mx-auto" />
      </div>
    </section>

    {/* Features Section */}
    <section className="container mx-auto px-4 py-16">
      <Skeleton className="h-8 w-48 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-64 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-background p-6 rounded-lg shadow-md">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-2/3" />
              <div className="mt-4 flex items-center">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="container mx-auto px-4 py-16 text-center">
      <Skeleton className="h-8 w-2/3 mx-auto mb-4" />
      <Skeleton className="h-4 w-1/2 mx-auto mb-8" />
      <Skeleton className="h-12 w-48 mx-auto" />
    </section>

    {/* Footer */}
    <footer className="bg-muted mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-24 mb-4" />
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-32 mb-2" />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </footer>
  </div>
  )
}

