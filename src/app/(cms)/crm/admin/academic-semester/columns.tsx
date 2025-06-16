// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TSemester, } from "@/lib/types/global"
import UpdateSemesterForm from "@/components/forms/admin/update/update-semester"
import { deleteSemester } from "@/lib/actions/semester"


export function AcademicSemesterColumns(): ColumnDef<TSemester>[] {

   return [
      {
         accessorKey: "title",
         header: "Periodo",
      },
      {
         accessorKey: "year",
         header: "Ano corrente",
      },
      {
         accessorKey: "code",
         header: "Codigo",
      },
      {
         accessorKey: "startMonth",
         header: "Mês inicial",
      },
      {
         accessorKey: "endMonth",
         header: "Mês final",
      },

      {
         accessorKey: "createdAt",
         header: "Data de criação",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const semester = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteSemester(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.SEMESTER_NOT_CREATED);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.SEMESTER_CREATED);
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
                     title="Detalhes do departamento"
                     description={`ID: ${semester.id}`}>
                     <UpdateSemesterForm values={semester} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(semester.id)} />
               </div>
            )
         },
      },
   ]
}
