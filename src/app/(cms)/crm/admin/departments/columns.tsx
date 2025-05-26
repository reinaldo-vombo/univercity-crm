// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import axios from "axios"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TDepartemant } from "@/lib/types/global"


export function DepartmentColumns(): ColumnDef<TDepartemant>[] {
   return [
      // {
      //    accessorKey: "avatarUrl",
      //    header: "Avatar",
      //    cell: ({ row }) => {
      //       const student = row.original;

      //       return (
      //          <Avatar name={student.name} photo={student.avatar} className="size-11" />
      //       );
      //    },
      //    enableSorting: false,
      //    enableHiding: false,
      // },
      {
         accessorKey: "title",
         header: "Name",
      },
      {
         accessorKey: "createdAt",
         header: "data de criação",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const department = row.original
            const handleDelete = async (id: string) => {
               try {
                  const res = await axios.delete(`/academic-department/${id}`,);
                  const result = await res.data;
                  if (!res.data.success) {
                     toast.error(result.error || "Failed to delete user.");
                     return;
                  }
                  toast.success(FLASH_MESSAGE.USER_DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do útilizador"
                     description={`ID: ${department.id}`}>Detalhes do útilizador {department.title}</SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     onClose={() => handleDelete(department.id)} />
               </div>
            )
         },
      },
   ]
}
