"use client";

import { DataTable } from "@/components/shared/data-table";
import { TActionHistory } from "@/types/global";
import { AuditColumns } from "./columns";
import CreateBuildingFrom from "@/components/forms/admin/post/create-building";
import AlertModal from "@/components/shared/alert-modal";
import { toast } from "sonner";
import { deleteAllAudiLog } from "@/actions/activitiys";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { Trash2 } from "lucide-react";

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
         <AlertModal
            trigger={<div className="flex items-center gap-2">
               <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
               <b>Limpar todos historicos</b>
               <b>({actionsHistory.length})</b>
            </div>}
            action={() => handleDeleteAll('')} />
         <DataTable
            actionForm={<CreateBuildingFrom />}
            fileHerderes={herader}
            fileName="Historicos"
            modalTitle="Criar Edificio"
            columns={columns}
            data={actionsHistory}
            filterColumn="entityType" />
      </div>
   )
}
