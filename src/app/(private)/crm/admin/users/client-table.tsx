"use client";

import CreateUser from "@/components/forms/admin/post/create-user";
import { Users, UsersColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface Props {
   data: Users[];
}

const herader = {
   id: "ID",
   name: "Full Name",
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
