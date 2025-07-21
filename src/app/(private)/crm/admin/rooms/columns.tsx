// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TBuilding, TRoom } from "@/types/global"
import { deleteRoom } from "@/lib/actions/room"
import UpdateRoomForm from "@/components/forms/admin/update/update-room"


export function RoomColumns(buldings: TBuilding[]): ColumnDef<TRoom>[] {

   return [
      {
         accessorKey: "roomNumber",
         header: "Número da sala",
      },
      {
         accessorKey: "floor",
         header: "Andar",
      },
      {
         accessorKey: "buildingTitle",
         header: "Edificio",
      },


      {
         id: "actions",
         cell: ({ row }) => {
            const room = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteRoom(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.COURSE_NOT_DELETED)
                  }
                  toast.success(FLASH_MESSAGE.COURSE_DELETED);
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
                     <UpdateRoomForm buildings={buldings} values={room} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(room.id)} />
               </div>
            )
         },
      },
   ]
}
