"use client";

import { DataTable } from "@/components/shared/data-table";
import { TCourse, TDepartemant, TFaculty } from "@/types/global";
import { FacultyColumns } from "./columns";
import ExportFacultysListFilterForm from "@/lib/helper/export/faculty-export";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateFacultyFrom = dynamic(() => import("@/components/forms/admin/post/create-faculty"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   falcultys: TFaculty[]
   departements: TDepartemant[];
   courses: TCourse[]
}
const herader = {
   firstName: "Primero nome",
   middleName: "Full Name",
   lastName: "Email",
   email: "Email",
   contactNo: "Contact",
   gender: "Género",
   shift: "Turno",
}

const uid = createUniqueId("create");
export function FalcultyTable({ falcultys, departements, courses }: Props) {


   const columns = FacultyColumns(departements, courses);

   return <DataTable
      actionForm={<CreateFacultyFrom departemants={departements} courses={courses} />}
      columns={columns}
      sheetId={uid}
      className="sm:max-w-lg"
      fileExport={<ExportFacultysListFilterForm />}
      fileHerderes={herader}
      modalTitle="Cadastrar professor"
      fileName="professores"
      data={falcultys}
      filterColumn="email" />;
}
