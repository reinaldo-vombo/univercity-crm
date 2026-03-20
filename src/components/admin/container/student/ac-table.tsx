import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { TMarkSheetRow } from "@/types/global"

interface Props { sheet: TMarkSheetRow[] }

export function AcTable({ sheet }: Props) {
   // número máximo de ACs em qualquer disciplina
   const maxAc = Math.max(...sheet.map((r) => r.ac.length), 0)
   const acHeaders = Array.from({ length: maxAc }, (_, i) => `AC ${i + 1}`)

   return (
      <Card>
         <CardHeader>
            <CardTitle>Avaliação Contínua</CardTitle>
            <CardDescription>Notas individuais de AC por disciplina</CardDescription>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <Table className="min-w-[480px]">
                  <TableHeader>
                     <TableRow>
                        <TableHead className="min-w-[160px] pl-6">Disciplina</TableHead>
                        {acHeaders.map((h) => (
                           <TableHead key={h} className="text-right w-16">{h}</TableHead>
                        ))}
                        <TableHead className="text-right w-24 pr-6">Média AC</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {sheet.map((row) => (
                        <TableRow key={row.disciplineName}>
                           <TableCell className="font-medium pl-6">
                              {row.disciplineName}
                           </TableCell>
                           {acHeaders.map((_, i) => {
                              const val = row.ac[i] ?? null
                              return (
                                 <TableCell key={i} className="text-right">
                                    {val !== null
                                       ? <span className="inline-flex items-center justify-center w-7 h-5 rounded text-xs font-medium bg-muted">{val}</span>
                                       : <span className="text-muted-foreground">—</span>
                                    }
                                 </TableCell>
                              )
                           })}
                           <TableCell className="text-right font-semibold pr-6">
                              {row.acAverage.toFixed(1)}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         </CardContent>
      </Card>
   )
}