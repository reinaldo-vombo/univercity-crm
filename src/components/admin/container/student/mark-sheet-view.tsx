// components/mark-sheet/mark-sheet-view.tsx — atualizado com AcTable
"use client"
import { AcTable } from "./ac-table"
import { TMarkSheet } from "@/types/global"
import { MarkSheetFilters } from "./mark-sheet-filters"
import { MarkSheetSummary } from "./mark-sheet-summary"
import { StudentMarkSheetTable } from "@/app/(private)/crm/admin/student/[id]/client-table"
import { useCallback } from "react"
import { createQueryString } from "@/lib/helper"
import { usePathname, useRouter, useSearchParams } from "next/navigation"



export function MarkSheetView({ data }: { data: TMarkSheet }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // lê da URL com fallback para os dados que vieram do pai
  const year = Number(searchParams.get("year")) || data.semester.year
  const semester: any = searchParams.get("semester") || data.semester.title

  const onChange = useCallback((name: string, value: string) => {
    router.push(
      pathname + "?" + createQueryString(searchParams, name, value),
      { scroll: false }
    )
  }, [router, pathname, searchParams])
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-10">
      <MarkSheetFilters
        year={year}
        semester={semester}
        studentName={data.student.name}
        studentId={data.student.studentId}
        onYearChange={(y) => onChange("year", String(y))}
        onSemesterChange={(s) => onChange("semester", s)}
      />
      <MarkSheetSummary summary={data.summary} />
      <StudentMarkSheetTable data={data.sheet} />
      <AcTable sheet={data.sheet} />
    </div>
  )
}