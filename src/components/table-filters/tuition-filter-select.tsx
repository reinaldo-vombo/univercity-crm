// components/tuition/tuition-filter-select.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

type Semester = "1º Semestre" | "2º Semestre"

interface Props {
   year: number
   semester: Semester
   onYearChange: (y: number) => void
   onSemesterChange: (s: Semester) => void
}

const AVAILABLE_YEARS = [2026, 2025, 2024]

export function TuitionFilterSelect({
   year, semester, onYearChange, onSemesterChange,
}: Props) {
   return (
      <div className="flex items-center gap-2">
         <Tabs value={semester} onValueChange={(v) => onSemesterChange(v as Semester)}>
            <TabsList className="h-8">
               <TabsTrigger value="1º Semestre" className="px-2 text-xs">1º Sem</TabsTrigger>
               <TabsTrigger value="2º Semestre" className="px-2 text-xs">2º Sem</TabsTrigger>
            </TabsList>
         </Tabs>
         <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
            <SelectTrigger className="h-8 w-20 text-xs">
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               {AVAILABLE_YEARS.map((y) => (
                  <SelectItem key={y} value={String(y)} className="text-xs">{y}</SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}