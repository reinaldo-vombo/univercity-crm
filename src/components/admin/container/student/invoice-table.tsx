import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '../../../ui/button'
import { Check, ChevronDown, Clock, Eye, FileDown, X } from 'lucide-react'
import { Input } from '../../../ui/input'
import { formatCurrency, formatDateTime } from "@/lib/helper"
import { Badge } from "@/components/ui/badge"
import ReceiptDownloadButton from "@/components/container/receipt/receipt-download-button"
import SheetModal from "@/components/shared/sheet-modal"
import InvoicePreview from "@/components/container/receipt/invoice-preview"

const invonces = [
   {
      id: '923',
      date: new Date(),
      status: 'PENDING',
      amount: 35000,
      extraCredit: 4000,
      month: 'Março'
   },
]
const student = {
   name: 'Reginalde Baggle',
   course: 'Ciencia da Computação',
   year: '2025',
   email: 'reiginalde@gmail.com',
   phone: 923456789
}

const InvoiceTable = () => {
   return (
      <div className="py-10">
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
                  <TableHead>Serviço</TableHead>
                  <TableHead>Recibo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quantia</TableHead>
                  <TableHead>Mês</TableHead>
                  <TableHead>Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {invonces.map((order) => (
                  <TableRow key={order.id}>
                     <TableCell className="font-medium">Propina</TableCell>
                     <TableCell className="flex">
                        <FileDown className="text-red-500" />
                        <div className="grid">
                           <b>Recibo #{order.id}</b>
                           {formatDateTime(order.date)}
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge className={`${order.status === 'PENDING' ? 'bg-yellow-500 border-amber-700' : order.status === 'PAID' ? 'bg-green-300 border-green-500' : 'bg-red-300 border-red-500'}`}>
                           {order.status === 'PENDING' ? <Clock className="text-amber-700" /> : order.status === 'PAID' ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                           <b>{order.status}</b>
                        </Badge>
                     </TableCell>
                     <TableCell>$ <b>{formatCurrency(order.amount)}</b></TableCell>
                     <TableCell>{order.month}</TableCell>
                     <TableCell className="flex gap-2">
                        {/* View Online */}
                        <SheetModal
                           trigger={<Eye />}
                           side="left"
                           className="sm:max-w-[50%]"
                           title="Recibo de pagamento"
                           description="Arquivo pdf do recibo de pagamento">
                           <InvoicePreview
                           />
                        </SheetModal>
                        <ReceiptDownloadButton payment={order} student={student} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default InvoiceTable
