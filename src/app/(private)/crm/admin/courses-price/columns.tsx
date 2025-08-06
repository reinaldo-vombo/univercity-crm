// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse, TCoursePrice } from "@/types/global"
import UpdateCoursePriceForm from "@/components/forms/admin/update/update-course-price"
import { deleteCoursePrice } from "@/lib/actions/course-price"


export function CoursesPriceColumns(course: TCourse[]): ColumnDef<TCoursePrice>[] {

   return [
      {
         accessorKey: "price",
         header: "Preço",
      },
      {
         accessorKey: "course",
         header: "Nome do curso",
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
            const credits = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteCoursePrice(id);
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
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do curso"
                     description='Visualizar detalhes do curso'>
                     helloi
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar curso"
                     description=' Formulario para atualizar o curso'>
                     <UpdateCoursePriceForm courses={course} defaultValue={credits} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(credits.id)} />
               </div>
            )
         },
      },
   ]
}
