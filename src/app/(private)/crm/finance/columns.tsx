// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId, formatCurrency, formatDate } from "@/lib/helper"
import Avatar from "@/components/shared/avatar"
import { TPayment } from "@/types/global"
import InvoicePreview from "@/components/container/receipt/invoice-preview"
import { CloseBage, CompleteBage } from "@/components/shared/bages"
import { paymentStatusBage } from "@/constants/status"

export function PaymentColumns(): ColumnDef<TPayment>[] {
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
               <div>
                  {paymentStatusBage(status)}
               </div>
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
               <>
                  {status ? <CompleteBage /> : <CloseBage />}
               </>
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
            const uid = createUniqueId("view");
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar curso"
                     description=' Formulario para atualizar o curso'>
                     hellot
                  </SheetModal>
                  <SheetModal
                     trigger={<Eye className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     id={uid}
                     className="sm:max-w-lg"
                     title="Descrição do pagamento"
                     description='Descrição do pagamento'>
                     <InvoicePreview />
                  </SheetModal>

               </div>
            )
         },
      },
   ]
}
