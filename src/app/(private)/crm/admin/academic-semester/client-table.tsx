"use client";

import { DataTable } from "@/components/shared/data-table";
import { TSemester } from "@/types/global";
import { AcademicSemesterColumns } from "./columns";
import CreateSemesterForm from "@/components/forms/admin/post/create-semester";
import { createUniqueId } from "@/lib/helper";

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
const uid = createUniqueId("create");
export function AcademicSemesterTable({ semester }: Props) {

   const columns = AcademicSemesterColumns();

   return <DataTable
      modalTitle="Cria semestre acadêmico"
      fileName="semester"
      sheetId={uid}
      filterColumn='title'
      fileHerderes={herader}
      columns={columns}
      data={semester}
      actionForm={<CreateSemesterForm />}
   />;
}
