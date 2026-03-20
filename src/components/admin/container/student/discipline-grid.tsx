import { Badge } from "@/components/ui/badge";
import { getStudentSemesterHistory } from "@/constants/data/student";
type THistory = Awaited<ReturnType<typeof getStudentSemesterHistory>>
type TSummary = THistory[number]
type TProps = {
   records: TSummary["disciplineRecords"]
}
const resultConfig = {
   EXEMPT: { label: "Dispensado", variant: "success" as const },
   APPROVED: { label: "Aprovado", variant: "success" as const },
   APPROVED_RETAKE: { label: "Recurso", variant: "warning" as const },
   APPROVED_SPECIAL: { label: "Especial", variant: "outline" as const },
   FAILED: { label: "Reprovado", variant: "destructive" as const },
   FAILED_FINAL: { label: "Reprovado", variant: "destructive" as const },
}

const DisciplineGrid = ({ records, }: TProps) => {
   return (
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
         {records.map((r) => {
            const cfg = resultConfig[r.result as keyof typeof resultConfig]
            const variante: any = cfg.variant
            return (
               <div
                  key={r.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
               >
                  <span className="truncate font-medium">{r.disciplineName}</span>
                  <div className="ml-3 flex items-center gap-2 shrink-0">
                     <span className="text-muted-foreground tabular-nums">
                        {r.totalMarks !== null ? r.totalMarks.toFixed(1) : "—"} v
                     </span>
                     <Badge variant={variante ?? "secondary"} className="text-xs">
                        {cfg?.label ?? r.result}
                     </Badge>
                  </div>
               </div>
            )
         })}
      </div>
   )
}
export default DisciplineGrid;