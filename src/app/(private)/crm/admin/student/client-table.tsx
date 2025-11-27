"use client";

import { DataTable } from "@/components/shared/data-table";
import { TCourse, TSemester, TStudent } from "@/types/global";
import { StudentColumns } from "./columns";
import CreateStudentFrom from "@/components/forms/admin/post/create-student";
import { createUniqueId } from "@/lib/helper";

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
