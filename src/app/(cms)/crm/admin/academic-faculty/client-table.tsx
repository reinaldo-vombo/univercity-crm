"use client";

import CreateFaculty from "@/components/forms/admin/post/create-faculty";
import { AcademicFacultyColumns, AcademicFaculty } from "./columns";
import { DataTable } from "@/components/sheard/data-table";

interface Props {
   data: AcademicFaculty[];
}
const herader = {
   id: "ID",
   title: "Full Name",
   createdAt: "Email",
}

export function AcademicFacultyTable({ data }: Props) {
   const columns = AcademicFacultyColumns();

   return <DataTable
      columns={columns}
      fileHerderes={herader}
      modalTitle="Unidade Acadêmica"
      actionForm={<CreateFaculty />}
      fileName="unidade-academica"
      data={data}
      filterColumn="title"
   />;
}
