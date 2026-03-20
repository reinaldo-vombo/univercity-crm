
import { Badge } from "@/components/ui/badge"
import {
   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { TMarkStatus } from "@/types/enum";
import { TMarkSheetRow } from "@/types/global";

const statusConfig: Record<TMarkStatus, { label: string; className: string, variant: "default" | "destructive" | "outline" | "secondary" | null | undefined }> = {
   DISPENSADO: { label: "Dispensado", variant: "secondary", className: 'bg-green-500' },
   ADMITIDO: { label: "Admitido", variant: "secondary", className: 'bg-green-500' },
   APROVADO: { label: "Aprovado", variant: "default", className: 'bg-green-500' },
   RECURSO: { label: "Recurso", variant: "outline", className: 'bg-red-500' },
   ESPECIAL: { label: "Especial", variant: "outline", className: 'bg-red-500' },
   REPROVADO: { label: "Reprovado", variant: "destructive", className: 'bg-red-800' },
   PENDENTE: { label: "Pendente", variant: "secondary", className: 'bg-amber-400' },
}

function N({ v }: { v: number | null }) {
   if (v === null) return <span className="text-muted-foreground ">—</span>
   return <span>{v.toFixed(1)}</span>
}

export function MarkSheetTable({ sheet }: { sheet: TMarkSheetRow[] }) {
   return (
      <div className="rounded-lg border overflow-x-auto">
         <Table className="min-w-[720px]">
            <TableHeader>
               <TableRow>
                  <TableHead className="min-w-[160px]">Disciplina</TableHead>
                  <TableHead className="text-right w-14">Disp.</TableHead>
                  <TableHead className="text-right w-20">MACs(PP1)</TableHead>
                  <TableHead className="text-right w-20">CPF(PP2)</TableHead>
                  <TableHead className="text-right w-20">CAF(M.C)</TableHead>
                  <TableHead className="text-right w-20">EXM</TableHead>
                  <TableHead className="text-right w-24">CFE(M.E)</TableHead>
                  <TableHead className="text-right w-20">RECURSO</TableHead>
                  <TableHead className="text-right w-24">CFE(M.R)</TableHead>
                  <TableHead className="text-right w-20">ESPECIAL</TableHead>
                  <TableHead className="text-right w-24">Nota Final</TableHead>
                  <TableHead className="w-28">Estado</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {sheet.map((row) => {
                  const cfg = statusConfig[row.status]
                  return (
                     <TableRow key={row.disciplineName}>
                        <TableCell className="font-medium">{row.disciplineName}</TableCell>
                        <TableCell className="text-right text-muted-foreground text-xs">
                           {row.suspendGrade} v
                        </TableCell>
                        <TableCell className="text-right font-medium">
                           <N v={row.acAverage} />
                        </TableCell>
                        <TableCell className="text-right"><N v={row.firstTest} /></TableCell>
                        <TableCell className="text-right"><N v={row.secondTest} /></TableCell>
                        <TableCell className="text-right"><N v={row.exam} /></TableCell>
                        <TableCell className="text-right"><N v={row.examAverage} /></TableCell>
                        <TableCell className="text-right"><N v={row.retake} /></TableCell>
                        <TableCell className="text-right"><N v={row.retakeAverage} /></TableCell>
                        <TableCell className="text-right"><N v={row.specialExam} /></TableCell>
                        <TableCell className="text-right font-bold">
                           <N v={row.totalMarks} />
                        </TableCell>
                        <TableCell>
                           <Badge variant={cfg.variant} className={cfg.className}>{cfg.label}</Badge>
                        </TableCell>
                     </TableRow>
                  )
               })}
            </TableBody>
         </Table>
      </div>
   )
}