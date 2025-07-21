// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TBuiding } from "@/types/global"
import { deleteBuilding } from "@/lib/actions/building"
import UpdateBuildingFrom from "@/components/forms/admin/update/update-building"


export function BuildingColumns(): ColumnDef<TBuiding>[] {

   return [
      {
         accessorKey: "title",
         header: "Titulo",
      },
      {
         accessorKey: "createdAt",
         header: "Data de  criação",
      },
      {
         accessorKey: "updatedAt",
         header: "Data de  atualização",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const building = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteBuilding(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.BUILDING_NOT_DELETED)
                  }
                  toast.success(FLASH_MESSAGE.BUILDING_DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar curso"
                     description=' Formulario para atualizar o curso'>
                     <UpdateBuildingFrom building={building} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(building.id)} />
               </div>
            )
         },
      },
   ]
}
