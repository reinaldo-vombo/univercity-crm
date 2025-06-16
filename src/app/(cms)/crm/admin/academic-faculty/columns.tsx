// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { handleApiError } from "@/lib/helper/api/error-handler"
import { deleteFaculty } from "@/lib/actions/academic-faculty"
import { TAcademicFaculty } from "@/lib/types/global"

export type AcademicFaculty = {
   id: string;
  title: string;
  createdAt: string;
  departments: string;
  facultys: string;
  students: number;
}

export function AcademicFacultyColumns(): ColumnDef<TAcademicFaculty>[] {
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
                  const res = await deleteFaculty(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.FACULTY_NOT_DELETED);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.FACULTY_DELETED);
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
                     title="Detalhes"
                     description='Detalhes da falculdade'>
                        falculdade
                     </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(curses.id)} />
               </div>
            )
         },
      },
   ]
}
