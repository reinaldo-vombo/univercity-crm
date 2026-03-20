import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"

export default function DataTableSkeleton() {
   return (
      <div className="w-full">
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[100px]">
                        <Skeleton className="h-4 rounded" />
                     </TableHead>
                     <TableHead className="w-[100px]">
                        <Skeleton className="h-4 rounded" />
                     </TableHead>
                     <TableHead className="w-[100px]">
                        <Skeleton className="h-4 rounded" />
                     </TableHead>
                     <TableHead className="text-right w-[100px]">
                        <Skeleton className="h-4 rounded ml-auto w-16" />
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {Array.from({ length: 6 }).map((_, index) => (
                     <TableRow key={index}>
                        <TableCell>
                           <Skeleton className="h-4 rounded w-20" />
                        </TableCell>
                        <TableCell>
                           <Skeleton className="h-4 rounded w-32" />
                        </TableCell>
                        <TableCell>
                           <Skeleton className="h-4 rounded w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                           <Skeleton className="h-4 rounded w-16 ml-auto" />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   )
}
