// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, LetterText, Pen, Trash, UserRoundMinusIcon, Users } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TOfferedCourse, TOfferedCourseSection } from "@/types/global"
import { createUniqueId, formatDate } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
import { DeleteOfferedCourseSection } from "@/actions/offered-couser-section"
import OffereCourseSectionDetais from "@/components/admin/container/offered-courses/offere-course-section"
const UpdateOfferedCourseSectionForm = dynamic(() => import("@/components/forms/admin/update/update-offered-course-section"),
   { ssr: false, loading: () => <FormLoading /> })

type TProps = {
   offeredCourse: TOfferedCourse[];
}


export function OfferedCourseSectionColumns({ offeredCourse }: TProps): ColumnDef<TOfferedCourseSection>[] {

   return [
      {
         accessorKey: "title",
         header: "Nome",
         cell: ({ row }) => {
            const title = row.original.title;
            return (
               <div className="flex items-center gap-2">
                  <LetterText className="h-4 w-4 text-green-500" />
                  <span className="truncate max-w-[180px]">{title}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "maxCapacity",
         header: "Vagas",
         cell: ({ row }) => {
            const capacity = row.original.maxCapacity;
            return (
               <div className="flex items-center gap-2">
                  <UserRoundMinusIcon className="h-4 w-4 text-indigo-500" />
                  <span className="truncate max-w-[180px]">{capacity}</span>
               </div>
            )
         },
      },

      {
         accessorKey: "Estado",
         header: "Inscritos",
         cell: ({ row }) => {
            const studentes = row.original.currentlyEnrolledStudent;
            return (
               <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span className="truncate max-w-[180px]">{studentes ?? 0}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de  publicação",
         cell: ({ row }) => {
            const createdAt = row.original.createdAt
            return (
               <span className="truncate max-w-[180px]">{formatDate(createdAt)}</span>
            )
         },
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const offeredCouse = row.original
            const handleDelete = async (id: string) => {
               try {
                  const res = await DeleteOfferedCourseSection(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };
            const uid = createUniqueId("view");

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`show-${uid}`}
                     className="sm:max-w-2xl"
                     title="Detalhes das desciplinas semestral"
                     description='Informações das desciplinas semestral'>
                     <OffereCourseSectionDetais data={offeredCouse} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${offeredCouse.id}`}
                     className="sm:max-w-2xl"
                     title="Atualizar desciplinas semestra"
                     description='Formulário de atualização da desciplinas semestral'>
                     <UpdateOfferedCourseSectionForm offeredCourses={offeredCourse} defautValues={offeredCouse} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(offeredCouse.id)} />
               </div>
            )
         },
      },
   ]
}
