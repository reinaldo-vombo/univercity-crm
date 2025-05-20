"use client";

import { useCallback } from "react";
import { Users, UsersColumns } from "./columns";
import { DataTable } from "@/components/sheard/data-table";

interface Props {
   data: Users[];
}

export function StudentTable({ data }: Props) {
   const handleView = useCallback((student: Users) => {
      console.log("Viewing", student);
   }, []);

   const handleDelete = useCallback((student: Users) => {
      console.log("Deleting", student);
   }, []);

   const columns = UsersColumns(handleView, handleDelete);

   return <DataTable columns={columns} data={data} filterColumn="name" />;
}
