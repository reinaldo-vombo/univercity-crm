"use client";

import { DataTable } from "@/components/shared/data-table";
import { TCourse, TDepartemant, TPrice, TFaculty } from "@/types/global";
import { CoursesColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateCourseForm = dynamic(() => import("@/components/forms/admin/post/create-course"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   couses: TCourse[];
   departements: TDepartemant[];
   falculty: TFaculty[];
   prices: TPrice[]
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

const uid = createUniqueId("create");
export function CoursesTable({ couses, departements, falculty, prices }: Props) {

   const columns = CoursesColumns(falculty, departements, prices);

   return <DataTable
      actionForm={<CreateCourseForm departments={departements} />}
      fileHerderes={herader}
      fileName="Cursos"
      sheetId={uid}
      className="sm:max-w-md"
      modalTitle="Criar Cursos"
      columns={columns}
      data={couses}
      filterColumn="title" />;
}
