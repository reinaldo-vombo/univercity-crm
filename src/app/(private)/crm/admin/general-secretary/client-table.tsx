"use client";

import { DataTable } from "@/components/shared/data-table";
import { RequestsColumns } from "./columns";
import { TRequest } from "@/types/global";

type TProps = {
   data: TRequest[]
}

export function RequestskSheetTable({ data }: TProps) {

   const columns = RequestsColumns();

   return <DataTable columns={columns} data={data} filterColumn="student" />;
}
