"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TAcademicFaculty, TDepartemant, TUser } from "@/types/global";
import { DepartementColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateDepartmentFrom = dynamic(() => import("@/components/forms/admin/post/create-department"),
   { ssr: false, loading: () => <FormLoading /> })

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

const uid = createUniqueId("create");
export function DepartmentTable({ users, departements, academicFacultys }: Props) {

   const columns = DepartementColumns(users, academicFacultys);

   return <DataTable
      actionForm={<CreateDepartmentFrom academicFaculty={academicFacultys} users={users} />}
      fileHerderes={herader}
      fileName="Departamentos"
      sheetId={uid}
      modalTitle="Criar Departamento"
      columns={columns}
      data={departements}
      filterColumn="title" />;
}
