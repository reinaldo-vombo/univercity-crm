import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatusCardSkeleton = () => {
   return (
      <Card className="@container/card animate-pulse">
         <CardHeader className="grid grid-cols-12 h-52 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
               <Skeleton className="col-span-3 h-52" key={index} />
            ))}

         </CardHeader>

      </Card>
   )
}
export default StatusCardSkeleton;