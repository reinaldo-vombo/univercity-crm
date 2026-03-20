"use client";

import { DataTable } from "@/components/shared/data-table";
import { MarkSheetColumns } from "./columns";
import { TMarkSheetRow } from "@/types/global";

type TProps = {
   data: TMarkSheetRow[]
}

export function StudentMarkSheetTable({ data }: TProps) {

   const columns = MarkSheetColumns();

   return <DataTable columns={columns} data={data} filterColumn="disciplineName" />;
}
