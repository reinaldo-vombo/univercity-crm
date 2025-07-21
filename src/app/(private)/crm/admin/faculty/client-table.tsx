"use client";

import { DataTable } from "@/components/shared/data-table";
import { TAcademicFaculty, TDepartemant, TFaculty } from "@/types/global";
import { FacultyColumns } from "./columns";
import CreateFacultyFrom from "@/components/forms/admin/post/create-faculty";

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

export function FalcultyTable({ falcultys, departements, academicFaculty }: Props) {
   const mergedFaculty = falcultys.map((faculty) => {
      const department = departements.find(
         (d) => d.id === faculty.academicDepartmentId
      );
      const facultyObj = academicFaculty.find(
         (f) => f.id === faculty.academicFacultyId
      );

      return {
         ...faculty,
         academicDepartment: department?.title ?? null,
         academicFaculty: facultyObj?.title ?? null,
      };
   });

   const columns = FacultyColumns(departements, academicFaculty);

   return <DataTable
      actionForm={<CreateFacultyFrom departemants={departements} academicFaculty={academicFaculty} />}
      columns={columns}
      className="sm:max-w-md"
      fileHerderes={herader}
      modalTitle="Cadastrar professor"
      fileName="professores"
      data={mergedFaculty}
      filterColumn="email" />;
}
