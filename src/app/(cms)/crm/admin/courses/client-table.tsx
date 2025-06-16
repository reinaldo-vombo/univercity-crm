"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TCourse } from "@/lib/types/global";
import { CoursesColumns } from "./columns";
import CreateCourseForm from "@/components/forms/admin/post/create-course";

interface Props {
   couses: TCourse[];
}
const herader = {
   id: "ID",
   title: "Full Name",
   code: "Codigo",
   credits: "Preco",
}

export function CoursesTable({ couses, }: Props) {

   const columns = CoursesColumns();

   return <DataTable
      actionForm={<CreateCourseForm />}
      fileHerderes={herader}
      fileName="Diciplinas"
      modalTitle="Criar Deciplinas"
      columns={columns}
      data={couses}
      filterColumn="title" />;
}
