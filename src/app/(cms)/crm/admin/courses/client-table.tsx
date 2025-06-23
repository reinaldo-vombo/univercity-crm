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
   title: "Nome do curso",
   coursePricing: "Preço",
   code: "Codigo",
   durationInYears: "Ano de duração",
   credits: "Preco",
   createdAt: "Data de criação",
   academicDepartment: "Departamento"
}

export function CoursesTable({ couses, departements }: Props) {
   const modifiedCouses = couses.map(course => ({
      ...course,  // Copy existing fields
      academicDepartment: course.academicDepartment.title,
      coursePricing: course.coursePricing.price
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
