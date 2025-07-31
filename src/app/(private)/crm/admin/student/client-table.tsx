"use client";

import { DataTable } from "@/components/shared/data-table";
import { TCourse, TSemester, TStudent } from "@/types/global";
import { StudentColumns } from "./columns";
import CreateStudentFrom from "@/components/forms/admin/post/create-student";

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
}

export function StudentTable({ students, academicSemester, courses }: Props) {

   const columns = StudentColumns(academicSemester, courses);

   return <DataTable
      actionForm={<CreateStudentFrom academicSemester={academicSemester} courses={courses} />}
      columns={columns}
      className="sm:max-w-md"
      fileHerderes={herader}
      modalTitle="Cadastrar aluno"
      fileName="alunos"
      data={students}
      filterColumn="firstName" />;
}
