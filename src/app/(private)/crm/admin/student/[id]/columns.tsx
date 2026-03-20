// components/mark-sheet/mark-sheet-columns.tsx
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { TMarkStatus } from "@/types/enum"
import { TMarkSheetRow } from "@/types/global"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"

function N({ v }: { v: number | null }) {
   if (v === null) return <span className="text-muted-foreground">—</span>
   return <span>{v.toFixed(1)}</span>
}

const statusConfig: Record<TMarkStatus, { label: string; variant: any; className?: string }> = {
   DISPENSADO: { label: "Dispensado", variant: "outline", className: "border-green-500 text-green-600" },
   ADMITIDO: { label: "Admitido", variant: "secondary" },
   APROVADO: { label: "Aprovado", variant: "outline", className: "border-green-500 text-green-600" },
   RECURSO: { label: "Recurso", variant: "outline", className: "border-orange-500 text-orange-500" },
   ESPECIAL: { label: "Especial", variant: "outline", className: "border-yellow-500 text-yellow-600" },
   REPROVADO: { label: "Reprovado", variant: "destructive" },
   PENDENTE: { label: "Pendente", variant: "secondary" },
}

export function MarkSheetColumns(): ColumnDef<TMarkSheetRow>[] {
   return [
      {
         accessorKey: "disciplineName",
         header: "Disciplina",
         cell: ({ row }) => (
            <span className="font-medium">{row.original.disciplineName}</span>
         ),
      },
      {
         accessorKey: "acAverage",
         header: "MACs (PP1)",
         cell: ({ row }) => <N v={row.original.acAverage} />,
      },
      {
         accessorKey: "firstTest",
         header: "CPF (PP2)",
         cell: ({ row }) => <N v={row.original.firstTest} />,
      },
      {
         accessorKey: "secondTest",
         header: "CAF (M.C)",
         cell: ({ row }) => <N v={row.original.secondTest} />,
      },
      {
         accessorKey: "exam",
         header: "EXM",
         cell: ({ row }) => <N v={row.original.exam} />,
      },
      {
         accessorKey: "examAverage",
         header: "CFE (M.E)",
         cell: ({ row }) => <N v={row.original.examAverage} />,
      },
      {
         accessorKey: "retake",
         header: "Recurso",
         cell: ({ row }) => <N v={row.original.retake} />,
      },
      {
         accessorKey: "retakeAverage",
         header: "CFE (M.R)",
         cell: ({ row }) => <N v={row.original.retakeAverage} />,
      },
      {
         accessorKey: "specialExam",
         header: "Especial",
         cell: ({ row }) => <N v={row.original.specialExam} />,
      },
      {
         accessorKey: "totalMarks",
         header: "Nota Final",
         cell: ({ row }) => (
            <span className="font-bold"><N v={row.original.totalMarks} /></span>
         ),
      },
      {
         accessorKey: "status",
         accessorFn: (row) => row.status,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Estado"
               options={[
                  { value: "DISPENSADO", label: "Dispensado" },
                  { value: "ADMITIDO", label: "Admitido" },
                  { value: "APROVADO", label: "Aprovado" },
                  { value: "RECURSO", label: "Recurso" },
                  { value: "ESPECIAL", label: "Especial" },
                  { value: "REPROVADO", label: "Reprovado" },
                  { value: "PENDENTE", label: "Pendente" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const cfg = statusConfig[row.original.status]
            return (
               <Badge variant={cfg.variant} className={cfg.className}>
                  {cfg.label}
               </Badge>
            )
         },
      },
   ]
}