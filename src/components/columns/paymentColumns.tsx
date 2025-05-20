// lib/columns/paymentColumns.ts
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  studentId: string
  amount: number
  date: string
  status: "paid" | "unpaid"
}

export function createPaymentColumns(): ColumnDef<Payment>[] {
  return [
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value: string = row.getValue("status")
        return <span className="capitalize">{value}</span>
      },
    },
  ]
}
