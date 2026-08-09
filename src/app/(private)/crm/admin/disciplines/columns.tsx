// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BookA, BookCheck, BookDashed, Calendar, Eye, Link, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse, TDiscipline, TFaculty, TOfferedCourseSection, TSemesterRegistration } from "@/types/global"
import { deleteDiscipline } from "@/actions/discipline"
import { createUniqueId, showYearLevel } from "@/lib/helper"
import FacultyDisciplineAssignmentForm from "@/components/forms/admin/post/assing-faculty-dicipline"
import DisciplineDetails from "@/components/admin/container/discipline-details"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateDisciplineForm = dynamic(() => import("@/components/forms/admin/update/update-discipline"),
   { ssr: false, loading: () => <FormLoading /> })

type TProps = {
   faculty: TFaculty[];
   semesterRegistration: TSemesterRegistration[],
   curses: TCourse[]
   disciplines: TDiscipline[]
   offeredCourseSection: TOfferedCourseSection[]
}
export function DisciplineColumns({ curses, faculty, semesterRegistration, disciplines, offeredCourseSection }: TProps): ColumnDef<TDiscipline>[] {

   return [
      {
         accessorKey: "name",
         header: "Nome",
         cell: ({ row }) => {
            const title = row.original.name;
            return (
               <div className="flex items-center gap-3">
                  <BookDashed className="text-green-500" />
                  <b>{title}</b>
               </div>
            )
         }
      },
      {
         accessorKey: "courseTitle",
         header: "Curso",
         cell: ({ row }) => {
            if (!row.original.courses) {
               return (
                  <div className="flex items-center gap-3">
                     <BookCheck className="text-red-500" />
                     <b>Sem curso</b>
                  </div>
               )
            }
            const title = row.original.courses[0]?.courseTitle;
            return (
               <div className="flex items-center gap-3">
                  <BookCheck className="text-purple-500" />
                  <b>{title}</b>
               </div>
            )
         }
      },
      {
         accessorKey: "semester",
         accessorFn: (row) => row.courses?.[0]?.semesterNumber ?? null,
         header: ({ column }) => <UniversalColumnFilter
            column={column}
            title="Semestre academico"
            options={[
               { value: "1", label: "1º semestre" },
               { value: "2", label: "2º semestre" },
            ]}
         />,
         cell: ({ row }) => {
            if (!row.original.courses) {
               return (
                  <div className="flex items-center gap-3">
                     <BookA className="text-red-500" />
                     <b>Sem semestre</b>
                  </div>
               )
            }

            const title = row.original.courses[0]?.semesterNumber;

            const year = row.original.courses[0]?.year;
            return (
               <div className="flex items-center gap-3">
                  <BookA className="text-indigo-500" />
                  <b>{title === 1 ? '1º Semestre' : '2º Semestre'}</b>
                  <b>{year}</b>
               </div>
            )
         }
      },
      {
         accessorKey: "yearLevel",
         accessorFn: (row) => row.courses?.[0]?.yearLevel ?? null,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Ano curricular"
               options={[
                  { value: "FIRST", label: "1º Ano" },
                  { value: "SECOND", label: "2º Ano" },
                  { value: "THIRD", label: "3º Ano" },
                  { value: "FOURTH", label: "4º Ano" },
                  { value: "FIFTH", label: "5º Ano" },
               ]}
            />
         ),
         cell: ({ row }) => {
            if (!row.original.courses) {
               return (
                  <div className="flex items-center gap-3">
                     <Calendar className="text-purple-500" />
                     <b>Sem Ano curricular</b>
                  </div>
               )
            }
            const yearLevel = row.original.courses[0]?.yearLevel;
            return (
               <div className="flex items-center gap-3">
                  <Calendar className="text-indigo-500" />
                  <b>{showYearLevel(yearLevel)}</b>
               </div>
            )
         }
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const discipline = row.original;
            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteDiscipline(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.SERVER_ERROR);
                  console.error(err);
               }
            };
            const uid = createUniqueId("view");
            const uid1 = createUniqueId("atribut");
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`view-${uid}`}
                     className="sm:max-w-2xl"
                     title="Detalhes do desciplina"
                     description='Informações sobre a desciplina'>
                     <DisciplineDetails data={discipline} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${discipline.id}`}
                     title="Atualizar disciplina"
                     description='Formulario de atualização'>
                     <UpdateDisciplineForm values={discipline} curses={curses} semesterRegistration={semesterRegistration} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Link className="h-4 w-4 text-purple-500 cursor-pointer" />}
                     side="right"
                     className="sm:max-w-lg"
                     id={`atribut-${uid1}`}
                     title="Atribuir Professor a Disciplina"
                     description='Formulario para atribuir a disciplina a um professor'>
                     <FacultyDisciplineAssignmentForm offeredCourseSection={offeredCourseSection} disciplines={disciplines} facultys={faculty} />
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
