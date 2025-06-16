// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse } from "@/lib/types/global"
import { deleteCourse } from "@/lib/actions/courses"
import UpdateCourseForm from "@/components/forms/admin/update/update-couses"
import CourseDetails from "@/components/admin/course-details"


export function CoursesColumns(): ColumnDef<TCourse>[] {

   return [
      {
         accessorKey: "title",
         header: "Titulo",
      },
      {
         accessorKey: "code",
         header: "Codigo",
      },
      {
         accessorKey: "credits",
         header: "Creditos",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const credits = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteCourse(id);
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
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do curso"
                     description='Detalhes do curso'>
                     <CourseDetails data={credits} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar curso"
                     description='Atualizar curso'>
                     <UpdateCourseForm values={credits} />
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
