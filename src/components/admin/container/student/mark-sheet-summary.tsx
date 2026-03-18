// components/mark-sheet/mark-sheet-summary.tsx

import { TMarkSheet } from "@/types/global"


type Summary = TMarkSheet["summary"]

export function MarkSheetSummary({ summary: s }: { summary: Summary }) {
   return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">{s.total}</p>
         </div>
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Aprovadas</p>
            <p className="text-lg font-semibold text-green-600">{s.approved}</p>
         </div>
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Reprovadas</p>
            <p className="text-lg font-semibold text-destructive">{s.failed}</p>
         </div>
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Recurso</p>
            <p className="text-lg font-semibold text-orange-500">{s.inResit}</p>
         </div>
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Especial</p>
            <p className="text-lg font-semibold text-yellow-600">{s.inSpecial}</p>
         </div>
         <div className="rounded-lg bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">Média</p>
            <p className="text-lg font-semibold text-blue-600">{s.semesterAverage} v</p>
         </div>
      </div>
   )
}