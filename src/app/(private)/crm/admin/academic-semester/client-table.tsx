"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TSemester } from "@/types/global";
import { AcademicSemesterColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateSemesterForm = dynamic(() => import("@/components/forms/admin/post/create-semester"),
   { ssr: false, loading: () => <FormLoading /> })

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
