import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BarChartSkeleton = () => {
   return (
      <Card className="animate-pulse">
         <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-2">
               <Skeleton className="h-5 w-44" />
               <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex gap-2">
               <Skeleton className="h-8 w-24 rounded-md" />
               <Skeleton className="h-8 w-24 rounded-md" />
            </div>
         </CardHeader>
         <CardContent>
            <div className="flex items-end gap-2 h-40">
               {[55, 80, 40, 90, 65, 75, 50, 85].map((h, i) => (
                  <Skeleton key={i} className="flex-1 rounded-t-sm rounded-b-none" style={{ height: `${h}%` }} />
               ))}
            </div>
            <div className="flex gap-2 mt-2">
               {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="flex-1 h-2.5" />
               ))}
            </div>
         </CardContent>
      </Card>
   )
}
export default BarChartSkeleton;