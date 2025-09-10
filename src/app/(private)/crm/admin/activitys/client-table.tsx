"use client";

import { DataTable } from "@/components/shared/data-table";
import { TActionHistory } from "@/types/global";
import { AuditColumns } from "./columns";
import CreateBuildingFrom from "@/components/forms/admin/post/create-building";

interface Props {
   actionsHistory: TActionHistory[];
}
const herader = {
   userId: "Id do author",
   action: "Acção",
   entityType: "Entidade",
   createdAt: "Data"
}

export function AuditTable({ actionsHistory }: Props) {
   const columns = AuditColumns();

   return <DataTable
      actionForm={<CreateBuildingFrom />}
      fileHerderes={herader}
      fileName="Edificios-&-Salas"
      modalTitle="Criar Edificio"
      columns={columns}
      data={actionsHistory}
      filterColumn="entityType" />;
}
