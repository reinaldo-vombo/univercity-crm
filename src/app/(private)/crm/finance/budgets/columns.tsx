// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Check, Eye, Loader, Pen, X } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { formatCurrency, formatDate } from "@/lib/helper"
import { Badge } from "@/components/ui/badge"
import Avatar from "@/components/shared/avatar"
import { TPayment } from "@/types/global"

export function PaymentColumns(): ColumnDef<TPayment>[] {
   const showStatus = (status: string) => {
      if (status === 'APROVED' || 'PAID') return <Check className="text-green-500 size-5" />
      if (status === 'PENDING' || 'PENDING') return <Loader className="animate-spin text-amber-500 size-5" />
      if (status === 'NOT_PAID') return <X className="text-red-500 size-5" />
   }
   return [
      {
         accessorKey: "paymentId",
         header: "Id",
      },
      {
         accessorKey: "transactionRef",
         header: "Referencia",
      },
      {
         accessorKey: "TotalAmount",
         header: "Valor pago",
         cell: ({ row }) => {
            const amount = row.original.TotalAmount;
            return (
               <b>{formatCurrency(amount)}</b>
            );
         },
      },
      {
         accessorKey: "extraAmount",
         header: "Creditos",
         cell: ({ row }) => {
            const amount = row.original.extraAmount;
            return (
               <b>{formatCurrency(amount)}</b>
            );
         },
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ row }) => {
            const status = row.original.status;
            return (
               <Badge className={`${status === 'PAID' ? 'bg-green-300 border-green-600' : status === 'PENDING' ? 'bg-amber-300 border-amber-600' : 'bg-red-300 border-red-600'} rounded-full`}>
                  {showStatus(status)} <b className="text-white">{status}</b>
               </Badge>
            );
         },
      },
      {
         accessorKey: "paymentType",
         header: "Tipo de Pagamento",
      },
      {
         accessorKey: "entity",
         cell: ({ row }) => {
            const user = row.original.entity;
            return (
               <div className="flex items-center gap-2">
                  <Avatar name={user} photo="/figure-1.png" />
                  <b>{user}</b>
               </div>
            );
         },
      },

      {
         accessorKey: "atendent",
         header: "Responsavel",
         cell: ({ row }) => {
            const user = row.original.atendent;
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
            const status = row.original.approved;
            return (
               <Badge className={`${status ? 'bg-green-300' : 'bg-red-300'} rounded-full text-white flex items-center gap-2`}>
                  <span className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full size-3`} />
                  <b>{status ? 'Confirmado' : 'Pendente'}</b>
               </Badge>
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
         id: "actions",
         header: 'Acção',
         cell: () => {
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar curso"
                     description=' Formulario para atualizar o curso'>
                     hello
                  </SheetModal>
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
