"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TDepartemant } from "@/lib/types/global";
import { DepartmentColumns } from "./columns";

interface Props {
   data: TDepartemant[];
}

export function DepartamentTable({ data }: Props) {
   const columns = DepartmentColumns();

   return <DataTable columns={columns} data={data} filterColumn="title" />;
}
