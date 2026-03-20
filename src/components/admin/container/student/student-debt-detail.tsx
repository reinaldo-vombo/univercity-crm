// components/tuition/student-debt-detail.tsx

import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/helper"
import { StudentBreakdown } from "@/types/global"

const statusConfig = {
   PAID: { label: "Pago", variant: "default" as const },
   PENDING: { label: "Pendente", variant: "secondary" as const },
   OVERDUE: { label: "Em atraso", variant: "destructive" as const },
}

export function StudentDebtDetail({ data }: { data: StudentBreakdown }) {
   const { student, totalPaid, totalPending, totalLateFee, monthlyPayments } = data

   return (
      <div className="flex flex-col gap-6">
         <div>
            <h2>{student.name}</h2>
         </div>
         {/* resumo */}
         <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted p-3">
               <p className="text-xs text-muted-foreground">Total pago</p>
               <p className="text-lg font-semibold">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
               <p className="text-xs text-muted-foreground">Pendente</p>
               <p className="text-lg font-semibold text-destructive">{formatCurrency(totalPending)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
               <p className="text-xs text-muted-foreground">Multa</p>
               <p className="text-lg font-semibold text-orange-500">
                  {totalLateFee > 0 ? formatCurrency(totalLateFee) : "—"}
               </p>
            </div>
         </div>

         {/* breakdown mensal */}
         <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Pagamentos por mês</p>
            {monthlyPayments.map((m) => {
               const cfg = statusConfig[m.status]
               return (
                  <div
                     key={m.monthName}
                     className="flex items-center justify-between rounded-md border px-4 py-2.5"
                  >
                     <span className="text-sm font-medium w-28">{m.monthName}</span>
                     <span className="text-sm">{formatCurrency(m.amount)}</span>
                     {m.lateFee > 0 && (
                        <span className="text-xs text-orange-500">
                           + {formatCurrency(m.lateFee)} multa
                        </span>
                     )}
                     <Badge variant={cfg.variant} className="">{cfg.label}</Badge>
                  </div>
               )
            })}
         </div>

      </div>
   )
}