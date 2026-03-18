import { Skeleton } from "../ui/skeleton"
import DataTableSkeleton from "./data-table"
import StatusCardSkeleton from "./satus-card"


const DataTabelCards = () => {
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="space-y-3">
               <Skeleton className="w-24 h-6 rounded-md" />
               <Skeleton className="w-7 h-5 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
               <Skeleton className="w-24 h-6 rounded-md" />
               <Skeleton className="w-24 h-6 rounded-md" />
            </div>
         </div>
         <StatusCardSkeleton />
         <DataTableSkeleton />
      </div>
   )
}

export default DataTabelCards;
