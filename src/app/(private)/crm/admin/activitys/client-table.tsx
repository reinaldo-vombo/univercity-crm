"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TActionHistory, TUser } from "@/types/global";
import { AuditColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";

interface Props {
   actionsHistory: TActionHistory[];
   users: TUser[];
}
const herader = {
   userId: "Id do author",
   action: "Acção",
   entityType: "Entidade",
   createdAt: "Data"
}
const uid = createUniqueId("create");

export function AuditTable({ actionsHistory, users }: Props) {
   const columns = AuditColumns(users);
   return (
      <div className="space-y-4">
         <DataTable
            fileHerderes={herader}
            fileName="Historicos"
            sheetId={uid}
            modalTitle="Criar Edificio"
            columns={columns}
            data={actionsHistory}
            filterColumn="entityType" />
      </div>
   )
}
