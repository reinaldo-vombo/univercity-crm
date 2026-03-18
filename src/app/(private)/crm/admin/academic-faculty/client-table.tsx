"use client";

import { AcademicFacultyColumns, AcademicFaculty } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
import { TPrice } from "@/types/global";
const CreateAcademicFacultyForm = dynamic(() => import("@/components/forms/admin/post/create-academic-faculty"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   data: AcademicFaculty[];
   prices: TPrice[]
}

const uid = createUniqueId("create");

export function AcademicFacultyTable({ data, prices }: Props) {
   const columns = AcademicFacultyColumns(prices);

   return <DataTable
      columns={columns}
      sheetId={uid}
      modalTitle="Unidade Acadêmica"
      actionForm={<CreateAcademicFacultyForm />}
      data={data}
      filterColumn="title"
   />;
}
