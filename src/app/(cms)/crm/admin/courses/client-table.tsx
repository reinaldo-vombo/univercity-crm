"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TCourse, TDepartemant } from "@/lib/types/global";
import { CoursesColumns } from "./columns";
import CreateCourseForm from "@/components/forms/admin/post/create-course";

interface Props {
   couses: TCourse[];
   departements: TDepartemant[]
}
const herader = {
   id: "ID",
   title: "Full Name",
   code: "Codigo",
   credits: "Preco",
}

export function CoursesTable({ couses, departements }: Props) {
   const modifiedCouses = couses.map(course => ({
      ...course,  // Copy existing fields
      academicDepartment: course.academicDepartment.title,  // Flatten `academicDepartment` to just `title`
   }));


   const columns = CoursesColumns();

   return <DataTable
      actionForm={<CreateCourseForm departments={departements} />}
      fileHerderes={herader}
      fileName="Cursos"
      modalTitle="Criar Cursos"
      columns={columns}
      data={modifiedCouses}
      filterColumn="title" />;
}
