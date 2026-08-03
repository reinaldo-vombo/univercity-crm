"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TCourse, TSemester, TStudent } from "@/types/global";
import { StudentColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateStudentFrom = dynamic(() => import("@/components/forms/admin/post/create-student"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   students: TStudent[]
   academicSemester: TSemester[],
   courses: TCourse[]
}
const herader = {
   firstName: "Primero nome",
   middleName: "Nome do meio",
   lastName: "Email",
   email: "Email",
   contactNo: "Contact",
   gender: "Género",
   shift: "Turno",
   isWoker: "Trabalhador",
   yearLevel: "Ano curricular",
   isActive: "Satutus",
}
const uid = createUniqueId("create");
export function StudentTable({ students, academicSemester, courses }: Props) {

   const columns = StudentColumns(academicSemester, courses);

   return <DataTable
      actionForm={<CreateStudentFrom academicSemester={academicSemester} courses={courses} />}
      columns={columns}
      sheetId={uid}
      className="sm:max-w-[38rem]"
      fileHerderes={herader}
      modalTitle="Cadastrar aluno"
      fileName="alunos"
      data={students}
      filterColumn="firstName" />;
}
