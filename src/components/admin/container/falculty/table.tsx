import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '../../../ui/button'
import { ChevronDown } from 'lucide-react'
import { Input } from '../../../ui/input'
type TTable = {
   data: {
      class: string;
      shift: string;
      students: number
   }
}

const InfoTable = () => {
   return (
      <div className="mx-auto py-10">
         <h1 className="text-2xl font-bold mb-4">Ecommerce Orders</h1>
         <div className="flex justify-between items-center mb-4">
            <Input
               placeholder="Search orders..."
               className="max-w-sm"
            />
            <Button>
               <ChevronDown className="mr-2 h-4 w-4" /> Export
            </Button>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Desciplina</TableHead>
                  <TableHead>Turno</TableHead>
                  <TableHead>Alunos</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                     <TableCell className="font-medium">{order.id}</TableCell>
                     <TableCell>{order.customer}</TableCell>
                     <TableCell>{order.date}</TableCell>
                     <TableCell>${order.total.toFixed(2)}</TableCell>
                     <TableCell>{order.status}</TableCell>
                     <TableCell>
                        {/* <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                 <span className="sr-only">Open menu</span>
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Update status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Cancel order</DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu> */}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default InfoTable;
