// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId, formatCurrency } from "@/lib/helper"
import Avatar from "@/components/shared/avatar"
import { StudentDebtDetail } from "@/components/admin/container/student/student-debt-detail"
import { Badge } from "@/components/ui/badge"
import { StudentBreakdown } from "@/types/global"

function debtStatusBadge(totalPending: number, totalLateFee: number) {
   if (totalPending === 0)
      return <Badge variant="default">Regularizado</Badge>
   if (totalLateFee > 0)
      return <Badge variant="destructive">Em atraso</Badge>
   return <Badge variant="outline">Pendente</Badge>
}

export function StudentDebtColumns(): ColumnDef<StudentBreakdown>[] {
   return [
      {
         accessorKey: "student",
         header: "ID",
         cell: ({ row }) => (
            <span className="text-muted-foreground text-sm">
               {row.original.student.studentId}
            </span>
         ),
      },
      {
         accessorKey: "student.name",
         header: "Aluno",
         cell: ({ row }) => {
            const { name } = row.original.student
            return (
               <div className="flex items-center gap-2">
                  <Avatar name={name} photo="" />
                  <span className="font-medium">{name}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "totalPaid",
         header: "Total pago",
         cell: ({ row }) => (
            <b>{formatCurrency(row.original.totalPaid)}</b>
         ),
      },
      {
         accessorKey: "totalPending",
         header: "Total pendente",
         cell: ({ row }) => {
            const amount = row.original.totalPending
            return (
               <b className={amount > 0 ? "text-destructive" : ""}>
                  {formatCurrency(amount)}
               </b>
            )
         },
      },
      {
         accessorKey: "totalLateFee",
         header: "Multa de atraso",
         cell: ({ row }) => {
            const amount = row.original.totalLateFee
            return amount > 0
               ? <b className="text-orange-500">{formatCurrency(amount)}</b>
               : <span className="text-muted-foreground">—</span>
         },
      },
      {
         accessorKey: "status",
         header: "Estado",
         cell: ({ row }) => {
            const { totalPending, totalLateFee } = row.original
            return debtStatusBadge(totalPending, totalLateFee)
         },
      },
      {
         accessorKey: "monthlyPayments",
         header: "Meses em dívida",
         cell: ({ row }) => {
            const pending = row.original.monthlyPayments.filter(
               (m) => m.status === "PENDING" || m.status === "OVERDUE"
            )
            if (pending.length === 0)
               return <span className="text-muted-foreground text-sm">Nenhum</span>
            return (
               <div className="flex flex-wrap gap-1">
                  {pending.map((m) => (
                     <Badge key={m.monthName} variant="outline" className="text-xs">
                        {m.monthName.slice(0, 3)}
                     </Badge>
                  ))}
               </div>
            )
         },
      },
      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const student = row.original
            const uid = createUniqueId("student-debt")
            return (
               <SheetModal
                  trigger={<Eye className="h-4 w-4 cursor-pointer" />}
                  side="right"
                  id={uid}
                  className="sm:max-w-2xl"
                  title={student.student.name}
                  description="Detalhe de pagamentos por mês"
               >
                  <StudentDebtDetail data={student} />
               </SheetModal>
            )
         },
      },
   ]
}