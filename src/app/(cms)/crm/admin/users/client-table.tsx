"use client";

import { Users, UsersColumns } from "./columns";
import { DataTable } from "@/components/sheard/data-table";

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
      fileName="users"
      columns={columns}
      data={data}
      filterColumn="name" />;
}
