"use client";

import CreateUser from "@/components/forms/admin/post/create-user";
import { UsersColumns } from "./columns";
import { TUser } from "@/types/global"
import { DataTable } from "@/components/shared/data-table";

interface Props {
   data: TUser[];
}

const herader = {
   id: "id",
   name: "Nome completo",
   email: "Email",
   role: "Role"
}

export function UsersTable({ data }: Props) {

   const columns = UsersColumns();

   return <DataTable
      modalTitle="Cria novo útilizador"
      fileHerderes={herader}
      actionForm={<CreateUser />}
      fileName="users"
      columns={columns}
      data={data}
      filterColumn="name" />;
}
