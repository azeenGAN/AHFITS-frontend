const ContactFormSkeleton = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-stone-950">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 place-items-center w-full max-w-4xl">
          <div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-stone-800 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-40 bg-gray-300 dark:bg-stone-800 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-stone-800 rounded-md w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-stone-800 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-stone-800 rounded-md w-1/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="space-y-8 w-full">
            <div className="h-8 bg-gray-300 dark:bg-stone-800 rounded-md w-1/2 mb-2 animate-pulse"></div>
  
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-1/2 animate-pulse"></div>
                <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-1/2 animate-pulse"></div>
              </div>
  
              <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
  
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
                <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
              </div>
  
              <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
              <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
              <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
              <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
  
              <div className="w-full flex flex-col py-6">
                <div className="h-10 bg-gray-300 dark:bg-stone-800 rounded-md w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export { ContactFormSkeleton }
  
  