"use client";

import { DataTable } from "@/components/shared/data-table";
import { TActionHistory, TUser } from "@/types/global";
import { AuditColumns } from "./columns";
import AlertModal from "@/components/shared/alert-modal";
import { toast } from "sonner";
import { deleteAllAudiLog } from "@/actions/activitiys";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { Trash2 } from "lucide-react";
import { createUniqueId } from "@/lib/helper";

interface Props {
   actionsHistory: TActionHistory[];
   users: TUser[];
   loggedUser: any
}
const herader = {
   userId: "Id do author",
   action: "Acção",
   entityType: "Entidade",
   createdAt: "Data"
}
const uid = createUniqueId("create");

export function AuditTable({ actionsHistory, users, loggedUser }: Props) {
   const columns = AuditColumns(users);
   const handleDeleteAll = async (id: string) => {
      try {
         const res = await deleteAllAudiLog(id);
         if (res.error) {
            toast.warning(res.message)
         }
         toast.success(FLASH_MESSAGE.DELETED);
         // Optionally refresh UI or mutate local state
      } catch (err) {
         toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
         console.error(err);
      }
   };
   return (
      <div className="space-y-4">
         {loggedUser.role !== 'super_admin' ? null : (

            <AlertModal
               trigger={<div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                  <b>Limpar todos historicos</b>
                  <b>({actionsHistory.length})</b>
               </div>}
               action={() => handleDeleteAll('')} />
         )}
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
