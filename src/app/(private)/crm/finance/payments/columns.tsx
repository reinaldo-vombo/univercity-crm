// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Check, Eye, Loader, Pen, X } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { formatCurrency, formatDate } from "@/lib/helper"
import { Badge } from "@/components/ui/badge"
import Avatar from "@/components/shared/avatar"

type TProps = {
   id: string;
   firstName: string;
   lastName: string;
   semesterPayment: {
      payment: {
         paymentType: string;
         paymentMethod: string;
         TotalAmount: number;
         status: string;
         approved: boolean;
         message: string;
         atendent: string
         createAt: Date;
      }[];
   }[];
}

export function PaymentColumns(): ColumnDef<TProps>[] {
   const showStatus = (status: string) => {
      if (status === 'APROVED' || 'PAID') return <Check className="text-green-950 " />
      if (status === 'PENDING' || 'PENDING') return <Loader className="animate-spin text-white" />
      if (status === 'NOT_APROVED') return <X className="text-red-500" />
   }
   return [
      {
         accessorKey: "paymentType",
         header: "Tipo de Pagamento",
      },
      {
         accessorKey: "paymentMethod",
         header: "Metodo",
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ row }) => {
            const status = row.original.semesterPayment[0].payment[0].status;
            return (
               <Badge className={`${status === 'PAID' ? 'bg-green-500' : status === 'PENDING' ? 'bg-amber-500' : 'bg-red-500'} rounded-full`}>
                  {showStatus(status)} <b className="text-white">{status}</b>
               </Badge>
            );
         },
      },
      {
         accessorKey: "atendent",
         header: "Responsavel",
         cell: ({ row }) => {
            const user = row.original.semesterPayment[0].payment[0].atendent;
            return (
               <div className="flex items-center gap-2">
                  <Avatar name={user} photo="/default.jpeg" />
                  <b>{user}</b>
               </div>
            );
         },
      },
      {
         accessorKey: "approved",
         header: "Situação",
         cell: ({ row }) => {
            const status = row.original.semesterPayment[0].payment[0].approved;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full text-white`}>
                  {status ? 'Confirmado' : 'Pendente'}
               </Badge>
            );
         },
      },

      {
         accessorKey: "TotalAmount",
         header: "Total",
         cell: ({ row }) => {
            const amount = row.original.semesterPayment[0].payment[0].TotalAmount;
            return (
               <b>{formatCurrency(amount)}</b>
            );
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de  publicação",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</span>
         ),
      },
      {
         accessorKey: "updatedAt",
         header: "Data de  atualização",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("updatedAt"))}</span>
         ),
      },
      {
         id: "actions",
         header: 'Acção',
         cell: ({ row }) => {
            const payment = row.original
            return (
               <div className="flex items-center gap-3">
                  {payment.semesterPayment[0].payment[0].paymentType === 'RECEIPT' && (
                     <SheetModal
                        trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                        side="right"
                        title="Atualizar curso"
                        description=' Formulario para atualizar o curso'>
                        hello
                     </SheetModal>
                  )}
                  <SheetModal
                     trigger={<Eye className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Descrição do pagamento"
                     description='Descrição do pagamento'>
                     hello
                  </SheetModal>

               </div>
            )
         },
      },
   ]
}
