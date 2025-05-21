"use client";

import { Users, UsersColumns } from "./columns";
import { DataTable } from "@/components/sheard/data-table";

interface Props {
   data: Users[];
}

export function StudentTable({ data }: Props) {

   const columns = UsersColumns();

   return <DataTable columns={columns} data={data} filterColumn="name" />;
}
