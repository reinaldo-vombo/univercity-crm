// components/mark-sheet/mark-sheet-view.tsx — atualizado com AcTable
"use client"
import { AcTable } from "./ac-table"
import { TMarkSheet } from "@/types/global"
import { MarkSheetFilters } from "./mark-sheet-filters"
import { MarkSheetSummary } from "./mark-sheet-summary"
import { StudentMarkSheetTable } from "@/app/(private)/crm/admin/student/[id]/client-table"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"


export function MarkSheetView({ data }: { data: TMarkSheet }) {

  const [semester, setSemester] = useQueryState('semester', parseAsString)
  const [year, setYear] = useQueryState('year', parseAsInteger)

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-10">
      <MarkSheetFilters
        year={year}
        semester={semester}
        studentName={data.student.name}
        studentId={data.student.studentId}
        onYearChange={setYear}
        onSemesterChange={setSemester}
      />
      <MarkSheetSummary summary={data.summary} />
      <StudentMarkSheetTable data={data.sheet} />
      <AcTable sheet={data.sheet} />
    </div>
  )
}