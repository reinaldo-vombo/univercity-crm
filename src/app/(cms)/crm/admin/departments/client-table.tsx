"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TAcademicFaculty, TDepartemant, TUser } from "@/lib/types/global";
import { DepartmentColumns } from "./columns";
import CreateDepartmentFrom from "@/components/forms/admin/post/create-department";

interface Props {
   departements: TDepartemant[];
   users: TUser[];
   academicFaculty: TAcademicFaculty[];
}
const herader = {
   id: "ID",
   title: "Full Name",
   createdAt: "Email",
}

export function DepartamentTable({ departements, users, academicFaculty }: Props) {

   const columns = DepartmentColumns(users, academicFaculty);

   return <DataTable
      actionForm={<CreateDepartmentFrom users={users} academicFaculty={academicFaculty} />}
      columns={columns}
      fileHerderes={herader}
      modalTitle="Criar de departamento"
      fileName="departamento"
      data={departements}
      filterColumn="title" />;
}
