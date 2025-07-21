"use client";

import { DataTable } from "@/components/shared/data-table";
import { TAcademicFaculty, TDepartemant, TUser } from "@/types/global";
import { DepartementColumns } from "./columns";
import CreateDepartmentFrom from "@/components/forms/admin/post/create-department";

interface Props {
   departements: TDepartemant[];
   users: TUser[];
   academicFacultys: TAcademicFaculty[]
}
const herader = {
   title: "Nome",
   academicFaculty: "Unidade",
   director: "Direitor",
   createdAt: "Data de criação",
}

export function DepartmentTable({ users, departements, academicFacultys }: Props) {

   const modifiedDepartement = departements.map(departement => {
      const director = users.find((user) => user.id === departement.departmentHeadId)
      return academicFacultys.map(academicFaculty => ({
         ...departement,
         academicFaculty: academicFaculty.title,
         director
      }));
   }).flat();

   const columns = DepartementColumns(users, academicFacultys);

   return <DataTable
      actionForm={<CreateDepartmentFrom academicFaculty={academicFacultys} users={users} />}
      fileHerderes={herader}
      fileName="Departamentos"
      modalTitle="Criar Departamento"
      columns={columns}
      data={modifiedDepartement}
      filterColumn="title" />;
}
