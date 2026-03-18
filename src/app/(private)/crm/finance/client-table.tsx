"use client";

import { DataTable } from "@/components/shared/data-table";
import { StudentDebtColumns } from "./columns";
import { TuitionSemester } from "@/types/global";
import { useState } from "react";
import { getTuitionSemester } from "@/lib/helper/tuition-mappers";
import Card from "@/components/shared/card";
import { TuitionFilterSelect } from "@/components/table-filters/tuition-filter-select";


const herader = {
   title: "Nome do curso",
}
export function PaymentTable({ data }: { data: TuitionSemester[] }) {
   const [year, setYear] = useState(new Date().getFullYear())
   const [semester, setSemester] = useState<"1º Semestre" | "2º Semestre">("1º Semestre")
   const filterData = getTuitionSemester(data, year, semester)
   const students = (filterData?.studentBreakdown ?? [])
      .filter((s) => s.totalPending > 0)
      .sort((a, b) => b.totalPending - a.totalPending)
   const columns = StudentDebtColumns();

   return (
      <Card lable="Alunos com pagamentos pendentes" description={`${students.length} aluno(s) em dívida`} showTitle={true}>
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
