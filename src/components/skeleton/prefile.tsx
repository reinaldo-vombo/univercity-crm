import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProfileSkeleton() {
   return (
      <div className="min-h-screen w-full p-4 sm:p-8">
         <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111319]">
            <Skeleton className="h-32 w-full rounded-none bg-slate-800/40 sm:h-36" />

            <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
               <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
                  <Skeleton className="h-24 w-24 shrink-0 rounded-2xl border-4 border-[#111319] sm:h-28 sm:w-28" />
                  <div className="space-y-2.5 pb-1">
                     <Skeleton className="h-6 w-40" />
                     <div className="flex flex-wrap gap-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-32" />
                     </div>
                  </div>
               </div>
               <Skeleton className="h-9 w-36 rounded-lg" />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-t border-slate-800 px-6 py-3 sm:px-8">
               <Skeleton className="h-4 w-14" />
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-4 w-20" />
            </div>
         </div>

         {/* Content grid */}
         <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
            {/* Left column */}
            <div className="rounded-2xl border border-slate-800 bg-[#111319] p-6">
               {Array.from({ length: 4 }).map((_, section) => (
                  <div key={section} className="mb-6">
                     <Skeleton className="mb-3 h-3 w-20" />
                     <div className="space-y-3">
                        {Array.from({ length: 3 }).map((__, row) => (
                           <div key={row} className="flex items-center gap-3">
                              <Skeleton className="h-4 w-4 rounded-sm" />
                              <Skeleton className="h-4 flex-1 max-w-[70%]" />
                           </div>
                        ))}
                     </div>
                  </div>
               ))}

               <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            {/* Right column - timeline */}
            <div className="rounded-2xl border border-slate-800 bg-[#111319] p-6">
               <Skeleton className="mb-6 h-4 w-40" />

               <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="flex gap-3">
                        <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
                        <div className="flex-1 space-y-2">
                           <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-40" />
                              <Skeleton className="h-3 w-16" />
                           </div>
                           <Skeleton className="h-3 w-full max-w-md" />
                           <Skeleton className="h-3 w-2/3 max-w-sm" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}