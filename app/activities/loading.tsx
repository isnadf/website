export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf8] dark:bg-gray-950">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden mx-auto max-w-[90rem] rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  