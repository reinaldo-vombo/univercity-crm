import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
function ChartCardSkeleton({ height = "240px" }: { height?: string }) {
   return (
      <Card>
         <CardHeader className="gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-28" />
         </CardHeader>
         <CardContent>
            <Skeleton className="w-full" style={{ height }} />
         </CardContent>
      </Card>
   )
}
const TuitionDashboardSkeleton = () => {
   return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">
         {/* filtros */}
         <div className="flex justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-3">
               <Skeleton className="h-9 w-36" />
               <Skeleton className="h-9 w-24" />
            </div>
         </div>
         {/* linha 1 */}
         <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-3">
            <div className="@3xl/main:col-span-2"><ChartCardSkeleton height="260px" /></div>
            <ChartCardSkeleton height="260px" />
         </div>
         {/* linha 2 */}
         <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
            <ChartCardSkeleton height="220px" />
            <ChartCardSkeleton height="220px" />
         </div>
         {/* tabela */}
         <Card>
            <CardHeader className="gap-2">
               <Skeleton className="h-5 w-52" />
               <Skeleton className="h-3 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
               {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
               ))}
            </CardContent>
         </Card>
      </div>
   )
}

export default TuitionDashboardSkeleton;