"use client";

import { DataTable } from "@/components/shared/data-table";
import { TAcademicFaculty, TDepartemant, TFaculty } from "@/types/global";
import { FacultyColumns } from "./columns";
import CreateFacultyFrom from "@/components/forms/admin/post/create-faculty";
import ExportFacultysListFilterForm from "@/lib/helper/export/faculty-export";
import { createUniqueId } from "@/lib/helper";

interface Props {
   falcultys: TFaculty[]
   departements: TDepartemant[];
   academicFaculty: TAcademicFaculty[];
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
export function FalcultyTable({ falcultys, departements, academicFaculty }: Props) {


   const columns = FacultyColumns(departements, academicFaculty);

   return <DataTable
      actionForm={<CreateFacultyFrom departemants={departements} academicFaculty={academicFaculty} />}
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
