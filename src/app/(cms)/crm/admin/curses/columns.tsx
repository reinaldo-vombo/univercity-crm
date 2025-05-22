// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import axios from "axios"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { handleApiError } from "@/lib/helper/api/error-handler"

export type TCurse = {
   id: string
   title: string
   createdAt: string
   departments: string
   facultys: string
   students: number
}

export function CurseColumns(): ColumnDef<TCurse>[] {
   return [

      {
         accessorKey: "title",
         header: "Titulo",
      },
      {
         accessorKey: "createdAt",
         header: "Ano de fundação",
      },
      {
         accessorKey: "faculties",
         header: "Professors",
      },
      {
         accessorKey: "students",
         header: "Estudantes",
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const curses = row.original
            const handleDelete = async (id: string) => {

               try {
                  const res = await axios.delete(`/api/curses/${id}`,);
                  const result = await res.data;
                  if (!res.data.success) {
                     toast.error(result.error || "Failed to delete user.");
                     return;
                  }
                  toast.success(FLASH_MESSAGE.USER_DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (error) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  handleApiError(error);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do útilizador"
                     description={`ID: ${curses.id}`}>Detalhes do útilizador {curses.title}</SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     onClose={() => handleDelete(curses.id)} />
               </div>
            )
         },
      },
   ]
}
