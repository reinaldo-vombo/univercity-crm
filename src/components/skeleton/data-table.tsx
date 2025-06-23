import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DataTableSkeleton() {
   return (
      <div className="w-full">
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[100px]">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                     </TableHead>
                     <TableHead>
                        <div className="h-4 bg-muted rounded animate-pulse" />
                     </TableHead>
                     <TableHead>
                        <div className="h-4 bg-muted rounded animate-pulse" />
                     </TableHead>
                     <TableHead className="text-right">
                        <div className="h-4 bg-muted rounded animate-pulse ml-auto w-16" />
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {Array.from({ length: 4 }).map((_, index) => (
                     <TableRow key={index}>
                        <TableCell>
                           <div className="h-4 bg-muted rounded animate-pulse w-20" />
                        </TableCell>
                        <TableCell>
                           <div className="h-4 bg-muted rounded animate-pulse w-32" />
                        </TableCell>
                        <TableCell>
                           <div className="h-4 bg-muted rounded animate-pulse w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                           <div className="h-4 bg-muted rounded animate-pulse w-16 ml-auto" />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   )
}
