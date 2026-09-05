"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { StudentDebtColumns } from "./columns";
import { TuitionSemester } from "@/types/global";
import { useMemo } from "react";
import Card from "@/components/shared/card";
import { TuitionFilterSelect } from "@/components/table-filters/tuition-filter-select";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";


const herader = {
   title: "Nome do curso",
}
const currentYear = new Date().getFullYear()
const semesters = ['1º Semestre', '2º Semestre'] as const
export function PaymentTable({ data }: { data: TuitionSemester[] }) {
   const [year, setYear] = useQueryState('year', parseAsInteger.withDefault(currentYear))
   const [semester, setSemester] = useQueryState(
      'semester',
      parseAsStringLiteral(semesters).withDefault('1º Semestre')
   )

   const students = useMemo(() => {
      const filterData = data.find(
         (d) => d.semester.year === String(year) && d.semester.title === semester
      )
      return (filterData?.studentBreakdown ?? [])
         .filter((s) => s?.totalPending > 0) // confere se é s.totalPending ou s.summary.totalPending no teu shape real de studentBreakdown
         .sort((a, b) => b.totalPending - a.totalPending)
   }, [data, year, semester])
   const columns = StudentDebtColumns();

   return (
      <Card lable="Todos os pagamentos" description={`${students.length} aluno(s) em dívida`} showTitle={true}>
         <TuitionFilterSelect
            year={year} semester={semester}
            onYearChange={setYear} onSemesterChange={setSemester}
         />
         <DataTable
            fileHerderes={herader}
            fileName="Pagamentos"
            columns={columns}
            data={students} />;
      </Card>
   )
}
