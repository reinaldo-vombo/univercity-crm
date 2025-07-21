// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TSemester, } from "@/types/global"
import UpdateSemesterForm from "@/components/forms/admin/update/update-semester"
import { deleteSemester } from "@/lib/actions/semester"
import { Badge } from "@/components/ui/badge"


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
         accessorKey: "isCurrent",
         header: "Status",
         cell: ({ row }) => {
            const status = row.original.isCurrent;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
                  {status ? 'Decorrendo' : 'Terminado'}
               </Badge>
            );
         },
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
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Atualizar semester acadêmico"
                     description='Formulário de atualização do semester acadêmico'>
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
