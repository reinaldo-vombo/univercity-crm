"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TAcademicFaculty, TDepartemant, TUser } from "@/lib/types/global";
import { DepartmentColumns } from "./columns";

interface Props {
   departements: TDepartemant[];
   users: TUser[];
   academicFaculty: TAcademicFaculty[];
}

export function DepartamentTable({ departements, users, academicFaculty }: Props) {

   const columns = DepartmentColumns(users, academicFaculty);

   return <DataTable columns={columns} data={departements} filterColumn="title" />;
}
