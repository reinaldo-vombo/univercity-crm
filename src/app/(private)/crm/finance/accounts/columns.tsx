// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId, formatCurrency, formatDate } from "@/lib/helper"
import Avatar from "@/components/shared/avatar"
import { TPayment } from "@/types/global"
import InvoicePreview from "@/components/export/pdfs/invoice-preview"
import { paymentStatusBage } from "@/constants/status"

const uid = createUniqueId("view");
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
         header: "Total",
         cell: ({ row }) => {
            const amount = row.original.totalAmount || 0;
            return (
               <b>{formatCurrency(amount)}</b>
            );
         },
      },
      {
         accessorKey: "extraAmount",
         header: "Creditos extras",
         cell: ({ row }) => {
            const amount = row.original.extraAmount || 0;
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
         accessorKey: "student",
         header: "Estudante",
         cell: ({ row }) => {
            const student = row.original.student;
            return (
               <div className="flex items-center gap-2">
                  <Avatar name={`${student.firstName} ${student.middleName}`} photo={student.profileImage || ''} />
                  <b>{`${student.firstName} ${student.middleName}`}</b>
               </div>
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
         cell: ({ row }) => {

            const payment = row.original
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
                     <InvoicePreview data={payment} />
                  </SheetModal>

               </div>
            )
         },
      },
   ]
}
