// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BookA, Building, Calendar1, Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TOfferedCourse } from "@/types/global"
import { createUniqueId, formatDate } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
import { CompleteBage, ProgressBage, CloseBage } from "@/components/shared/bages"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import { DeleteOfferedCourse } from "@/actions/offered-couser"
import OfferedCourseDtails from "@/components/admin/container/offered-courses/offered-course"
const UpdateOfferedCourseForm = dynamic(() => import("@/components/forms/admin/update/update-offered-course"),
   { ssr: false, loading: () => <FormLoading /> })

type TProps = {
   course: any;
   departments: any;
   disciplines: any;
   semesterRegistration: any
}

const uid = createUniqueId("view");
export function OfferedCourseColumns({ course, departments, disciplines, semesterRegistration }: TProps): ColumnDef<TOfferedCourse>[] {

   return [
      {
         accessorKey: "academicDepartment",
         header: "Departamento",
         cell: ({ row }) => {
            const department = row.original.academicDepartment.title;
            return (
               <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-green-500" />
                  <span className="truncate max-w-[180px]">{department}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "course",
         header: "Curso",
         cell: ({ row }) => {
            const course = row.original.course.title;
            return (
               <div className="flex items-center gap-2">
                  <BookA className="h-4 w-4 text-indigo-500" />
                  <span className="truncate max-w-[180px]">{course}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "semester",
         accessorFn: (row) => row.semesterRegistration.academicSemester.title,
         header: ({ column }) => <UniversalColumnFilter
            column={column}
            title="Semestre academico"
            options={[
               { value: "1 semestre", label: "1º semestre" },
               { value: "2 semestre", label: "2º semestre" },
            ]}
         />,
         cell: ({ row }) => {
            if (!row.original.semesterRegistration) {
               return (
                  <div className="flex items-center gap-3">
                     <BookA className="text-red-500" />
                     <b>Sem semestre</b>
                  </div>
               )
            }
            const title = row.original.semesterRegistration.academicSemester.title;
            const year = row.original.semesterRegistration.academicSemester.year;
            return (
               <div className="flex items-center gap-3">
                  <BookA className="text-indigo-500" />
                  <b>{title}</b> -
                  <b>{year}</b>
               </div>
            )
         }
      },
      {
         accessorKey: "Estado",
         header: "status",
         cell: ({ row }) => {
            const semester = row.original.semesterRegistration;
            return (
               <>
                  {semester.status === 'UPCOMING'
                     ? <ProgressBage title="Brevemente" />
                     : semester.status === 'ONGOING'
                        ? <CompleteBage title="Decorrendo" />
                        : <CloseBage title="Ecerrado" />}
               </>
            )
         },
      },
      {
         accessorKey: "startDate",
         header: "Data inicial",
         cell: ({ row }) => {
            const startDate = row.original.semesterRegistration.startDate;
            return (
               <div className="flex items-center gap-3">
                  <Calendar1 className="text-indigo-500" />
                  <b className="truncate max-w-[180px]">{formatDate(startDate)}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "endDate",
         header: "Data de encerramento",
         cell: ({ row }) => {
            const endDate = row.original.semesterRegistration.endDate;
            return (
               <div className="flex items-center gap-3">
                  <Calendar1 className="text-red-500" />
                  <b className="truncate max-w-[180px]">{formatDate(endDate)}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de  publicação",
         cell: ({ row }) => {
            const createdAt = row.original.semesterRegistration.createdAt
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
                  const res = await DeleteOfferedCourse(id);
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

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={uid}
                     className="sm:max-w-2xl"
                     title="Detalhes das desciplinas semestral"
                     description='Informações das desciplinas semestral'>
                     <OfferedCourseDtails data={offeredCouse} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${offeredCouse.id}`}
                     className="sm:max-w-2xl"
                     title="Atualizar desciplinas semestra"
                     description='Formulário de atualização da desciplinas semestral'>
                     <UpdateOfferedCourseForm
                        defaultValues={offeredCouse}
                        curses={course}
                        departments={departments}
                        disciplines={disciplines}
                        semesterRegistrations={semesterRegistration}
                     />
                  </SheetModal>
                  {/* <SheetModal
                     trigger={<Link2Icon className="h-4 w-4  cursor-pointer text-purple-500" />}
                     side="right"
                     id={uid2}
                     className="sm:max-w-2xl"
                     title="Atribuir Professores a disciplina"
                     description='Formulário de atribuição de disciplina'>
                     <FacultyDisciplineAssignmentForm

                        disciplines={disciplines}
                        offeredCourseSectionId={offeredCouse.id}
                        facultys={facultys}
                     />
                  </SheetModal> */}
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(offeredCouse.id)} />
               </div>
            )
         },
      },
   ]
}
