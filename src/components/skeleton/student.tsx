// components/student/student-page-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

function InfoListSkeleton({ rows }: { rows: number }) {
   const widths = ["40%", "55%", "45%", "50%", "60%", "42%", "65%", "52%"]
   return (
      <ul className="space-y-4">
         {Array.from({ length: rows }).map((_, i) => (
            <li key={i}>
               <Skeleton className="h-3.5" style={{ width: widths[i % widths.length] }} />
            </li>
         ))}
      </ul>
   )
}

function TableSkeleton({ rows = 7, cols = 5 }: { rows?: number; cols?: number }) {
   const colWidths = ["flex-[2]", "flex-1", "flex-1", "flex-1", "flex-1"]
   return (
      <div className="flex flex-col gap-0">
         {/* header */}
         <div className="flex gap-3 px-4 py-2.5 bg-muted rounded-lg mb-2">
            {Array.from({ length: cols }).map((_, i) => (
               <Skeleton key={i} className={`h-3 ${colWidths[i] ?? "flex-1"}`} />
            ))}
         </div>
         {/* rows */}
         {Array.from({ length: rows }).map((_, i) => (
            <div
               key={i}
               className="flex gap-3 px-4 py-3 border-b last:border-0"
            >
               {Array.from({ length: cols }).map((_, j) => (
                  <Skeleton
                     key={j}
                     className={`h-3.5 ${colWidths[j] ?? "flex-1"} ${j === cols - 1 ? "max-w-[60%]" : ""}`}
                  />
               ))}
            </div>
         ))}
      </div>
   )
}

const StudentPageSkeleton = () => {
   return (
      <div className="px-4 lg:px-6 pb-10">

         {/* breadcrumb */}
         <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-32" />
         </div>

         <div className="grid grid-cols-12 gap-2 mt-12 mb-10">

            {/* ── coluna esquerda ── */}
            <div className="col-span-4">

               {/* cover + avatar */}
               <div className="relative mb-14">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="absolute left-4 -bottom-12 size-40 rounded-full border-4 border-background" />
               </div>

               {/* nome */}
               <Skeleton className="h-8 w-3/4 mb-7" />

               {/* lista de informações */}
               <div className="mb-5">
                  <InfoListSkeleton rows={8} />
               </div>

               {/* botões */}
               <div className="flex gap-3 my-4">
                  <Skeleton className="h-9 w-44 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
               </div>

               {/* card info curso */}
               <div className="border rounded-2xl bg-secondary p-4 mb-4">
                  <Skeleton className="h-7 w-3/5 mb-6" />

                  <ul className="space-y-3 mb-4">
                     {["80%", "55%", "65%", "50%", "70%", "60%"].map((w, i) => (
                        <li key={i}>
                           <Skeleton className="h-3.5" style={{ width: w }} />
                        </li>
                     ))}
                  </ul>

                  <div className="grid grid-cols-12 gap-5 mt-4">
                     <div className="col-span-6 flex gap-3">
                        <div className="flex flex-col gap-1.5 flex-1">
                           <Skeleton className="h-3 w-full" />
                           <Skeleton className="h-6 w-3/4" />
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                     <div className="col-span-6 flex gap-3">
                        <div className="flex flex-col gap-1.5 flex-1">
                           <Skeleton className="h-3 w-full" />
                           <Skeleton className="h-6 w-3/4" />
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                  </div>

                  <Separator className="my-3" />
                  <Skeleton className="h-7 w-2/5 mt-2" />
               </div>
            </div>

            {/* ── coluna direita ── */}
            <div className="col-span-8">
               {/* tabs nav */}
               <div className="flex gap-2 border-b pb-2 mb-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                     <Skeleton key={i} className="h-8 w-24 rounded-md" />
                  ))}
               </div>

               {/* conteúdo da tab */}
               <TableSkeleton rows={7} cols={5} />
            </div>

         </div>
      </div>
   )
}

export default StudentPageSkeleton;