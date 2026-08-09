// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Building, Building2Icon, Pen, Tags, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TBuilding, TRoom } from "@/types/global"
import { deleteRoom } from "@/actions/room"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateRoomForm = dynamic(() => import("@/components/forms/admin/update/update-room"),
   { ssr: false, loading: () => <FormLoading /> })


export function RoomColumns(buldings: TBuilding[]): ColumnDef<TRoom>[] {

   return [
      {
         accessorKey: "roomNumber",
         header: "Número da sala",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Tags className="h-4 w-4 text-green-500" />
               <span>{row.getValue("roomNumber")}</span>
            </div>
         ),
      },
      {
         accessorKey: "floor",
         header: "Andar",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Building2Icon className="h-4 w-4 text-neutral-500" />
               <span>{row.getValue("floor")}</span>
            </div>
         ),
      },
      {
         accessorKey: "buildingTitle",
         header: "Edificio",
         cell: ({ row }) => {
            const building = row.original.building.title
            return (
               <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-amber-500" />
                  <span>{building}</span>
               </div>
            )
         },
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const room = row.original

            const handleDelete = async (id: number) => {
               try {
                  const res = await deleteRoom(id);
                  if (res.error) {
                     toast.warning(res.message)
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.SERVER_ERROR);
                  console.error(err);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     id={`edit-${room.id}`}
                     title="Atualizar curso"
                     description='Formulario para atualizar o curso'>
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
