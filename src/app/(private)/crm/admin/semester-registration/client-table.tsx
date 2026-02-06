"use client";

import { DataTable } from "@/components/shared/data-table";
import { TSemester, TSemesterRegistration } from "@/types/global";
import { AcademicSemesterRegistartionColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateSemesterRegistartionForm = dynamic(() => import("@/components/forms/admin/post/create-semester-registration"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   semesterRegistration: TSemesterRegistration[];
   academicSemester: TSemester[]
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
export function AcademicSemesterRegistrationTable({ academicSemester, semesterRegistration }: Props) {

   const columns = AcademicSemesterRegistartionColumns(academicSemester);

   return <DataTable
      modalTitle="Cria registro semestral"
      fileName="Registro Semestral"
      sheetId={uid}
      fileHerderes={herader}
      columns={columns}
      data={semesterRegistration}
      actionForm={<CreateSemesterRegistartionForm semesters={academicSemester} />}
   />;
}
