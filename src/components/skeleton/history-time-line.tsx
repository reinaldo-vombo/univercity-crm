import { Skeleton } from "../ui/skeleton";

const HistorySkeleton = () => {
   return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">
         {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
               <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-1" />
               <div className="flex-1 flex flex-col gap-3 pb-8">
                  <div className="flex justify-between">
                     <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                     </div>
                     <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                     {Array.from({ length: 6 }).map((_, j) => (
                        <Skeleton key={j} className="h-10 rounded-md" />
                     ))}
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}
export default HistorySkeleton;