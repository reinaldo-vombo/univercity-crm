// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TDiscipline } from "@/lib/types/global"
import { deleteDiscipline } from "@/lib/actions/discipline"
import UpdateDisciplineForm from "@/components/forms/admin/update/update-discipline"

export function DisciplineColumns(): ColumnDef<TDiscipline>[] {

   return [
      {
         accessorKey: "name",
         header: "Nome",
      },
      {
         accessorKey: "code",
         header: "Codigo",
      },
      {
         accessorKey: "minimumGradeToDismiss",
         header: "Nota chave",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const discipline = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteDiscipline(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.DISCIPLINE_NOT_DELETED);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DISCIPLINE_DELETED);
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
                     description=''>
                     hello
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Atualizar disciplina"
                     description='Formulario de atualização'>
                     <UpdateDisciplineForm values={discipline} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(discipline.id)} />
               </div>
            )
         },
      },
   ]
}
