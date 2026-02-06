"use client";

import { AcademicFacultyColumns, AcademicFaculty } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateAcademicFacultyForm = dynamic(() => import("@/components/forms/admin/post/create-academic-faculty"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   data: AcademicFaculty[];
}
const herader = {
   id: "ID",
   title: "Full Name",
   createdAt: "Email",
}
const uid = createUniqueId("create");

export function AcademicFacultyTable({ data }: Props) {
   const columns = AcademicFacultyColumns();

   return <DataTable
      columns={columns}
      fileHerderes={herader}
      sheetId={uid}
      modalTitle="Unidade Acadêmica"
      actionForm={<CreateAcademicFacultyForm />}
      fileName="unidade-academica"
      data={data}
      filterColumn="title"
   />;
}
