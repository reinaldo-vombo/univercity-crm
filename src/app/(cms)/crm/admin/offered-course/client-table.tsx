"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TCourse, TDepartemant, TOfferedCourse, TSemester } from "@/lib/types/global";
import { OfferdCourseColumns } from "./columns";
import CreateDepartmentFrom from "@/components/forms/admin/post/create-department";

interface Props {
   departements: TDepartemant[];
   offeredCourse: TOfferedCourse[];
   semester: TSemester[];
   couses: TCourse[]
}
const herader = {
   id: "ID",
   title: "Full Name",
   createdAt: "Email",
}

export function OfferdCourseTable({ departements, couses, offeredCourse, semester }: Props) {

   const columns = OfferdCourseColumns(users, academicFaculty);

   return <DataTable
      actionForm={<CreateDepartmentFrom users={users} academicFaculty={academicFaculty} />}
      columns={columns}
      fileHerderes={herader}
      modalTitle="Criar de departamento"
      fileName="departamento"
      data={departements}
      filterColumn="title" />;
}
