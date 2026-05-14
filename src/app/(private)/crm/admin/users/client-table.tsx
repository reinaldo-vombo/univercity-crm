"use client";

import { UsersColumns } from "./columns";
import { TUser } from "@/types/global"
import { DataTable } from "@/components/shared/data-table";
import dynamic from "next/dynamic";
import FormLoading from "@/components/skeleton/form";
const CreateUser = dynamic(() => import("@/components/forms/admin/post/create-user"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   data: TUser[];
}
export function UsersTable({ data }: Props) {

   const columns = UsersColumns();

   return <DataTable
      modalTitle="Cria novo útilizador"
      actionForm={<CreateUser />}
      fileName="users"
      columns={columns}
      data={data}
      filterColumn="name" />;
}
