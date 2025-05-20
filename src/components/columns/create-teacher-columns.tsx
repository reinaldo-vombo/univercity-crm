// lib/columns/teacherColumns.ts

import { ColumnDef } from "@tanstack/react-table"

export type Teacher = {
   id: string
   name: string
   department: string
   email: string
}

export function createTeacherColumns(): ColumnDef<Teacher>[] {
   return [
      {
         accessorKey: "name",
         header: "Name",
      },
      {
         accessorKey: "department",
         header: "Department",
      },
      {
         accessorKey: "email",
         header: "Email",
      },
   ]
}
