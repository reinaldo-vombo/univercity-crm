// components/mark-sheet/mark-sheet-filters.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

type Semester = "1º Semestre" | "2º Semestre"

interface Props {
   year: number
   semester: Semester
   studentName: string
   studentId: string
   onYearChange: (y: number) => void
   onSemesterChange: (s: Semester) => void
}

const AVAILABLE_YEARS = [2025, 2024]

export function MarkSheetFilters({
   year, semester, studentName, studentId, onYearChange, onSemesterChange,
}: Props) {

   return (
      <div className="flex flex-wrap items-center justify-between gap-4">
         <div>
            <h1 className="text-xl font-semibold">Pauta · {studentName}</h1>
            <p className="text-xs text-muted-foreground">{studentId}</p>
         </div>
         <div className="flex items-center gap-2">
            <Tabs value={semester} onValueChange={(v) => onSemesterChange(v as Semester)}>
               <TabsList className="h-8">
                  <TabsTrigger value="1º Semestre" className="px-2 text-xs cursor-pointer">1º Sem</TabsTrigger>
                  <TabsTrigger value="2º Semestre" className="px-2 text-xs cursor-pointer">2º Sem</TabsTrigger>
               </TabsList>
            </Tabs>
            <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
               <SelectTrigger className="h-8 w-20 text-xs">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  {AVAILABLE_YEARS.map((y) => (
                     <SelectItem key={y} value={String(y)} className="text-xs cursor-pointer">{y}</SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>
      </div>
   )
}