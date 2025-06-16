"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TSemester } from "@/lib/types/global";
import { AcademicSemesterColumns } from "./columns";
import CreateSemesterForm from "@/components/forms/admin/post/create-semester";

interface Props {
   semester: TSemester[];
}
const herader = {
   id: "ID",
   title: "Full Name",
   code: "Codigo",
   year: "Ano Corrente",
   startMonth: "Mês inicial",
   endMonth: "Mês de encerramento"
}
//academicDepartmentId, courseId, semesterRegistrationId
export function AcademicSemesterTable({ semester }: Props) {

   const columns = AcademicSemesterColumns();

   return <DataTable
      modalTitle="Cria semestre acadêmico"
      fileName="semester"
      filterColumn='title'
      fileHerderes={herader}
      columns={columns}
      data={semester}
      actionForm={<CreateSemesterForm />}
   />;
}
