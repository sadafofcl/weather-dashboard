import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 
                  border-2 border-gray-200 dark:border-gray-700 animate-pulse">
    <Skeleton className="h-6 w-24 mx-auto mb-4 bg-teal-300 dark:bg-teal-700" />
    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3 bg-purple-300 dark:bg-purple-700" />
    <Skeleton className="h-4 w-32 mx-auto mb-6 bg-gray-300 dark:bg-gray-600" />
    <Skeleton className="h-12 w-24 mx-auto mb-6 rounded-xl bg-pink-300 dark:bg-pink-700" />
    <div className="grid grid-cols-2 gap-2">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
      ))}
    </div>
  </div>
);

export default function LoadingStatesSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
      <Skeleton className="h-10 w-80 mx-auto rounded-xl bg-linear-to-r from-teal-300 to-purple-300 dark:from-teal-800 dark:to-purple-800" />
      
      {[1, 2, 3].map((day) => (
        <section key={day} className="space-y-4">
          <Skeleton className="h-7 w-48 mx-auto rounded-lg bg-teal-200 dark:bg-teal-800" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((card) => <SkeletonCard key={card} />)}
          </div>
        </section>
      ))}
    </div>
  );
}