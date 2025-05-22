"use client";

import { CurseColumns, TCurse } from "./columns";
import { DataTable } from "@/components/sheard/data-table";

interface Props {
   data: TCurse[];
}

export function CursesTable({ data }: Props) {
   const columns = CurseColumns();

   return <DataTable columns={columns} data={data} filterColumn="title" />;
}
