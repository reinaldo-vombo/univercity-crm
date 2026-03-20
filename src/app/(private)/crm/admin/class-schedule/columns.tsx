// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BookA, Calendar, Eye, LetterText, Moon, Pen, Sun, SunMoon, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TClassShedule, TDiscipline, TOfferedCourseSection, TRoom, TSemesterRegistration } from "@/types/global"
import { createUniqueId, showYearLevel } from "@/lib/helper"
import { DeleteOfferedCourseSchedule, DeleteOfferedCourseScheduleByDiscipline } from "@/actions/offered-course-class-shedule"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import { TimetableGrid } from "@/components/admin/container/class-schedule/details"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateOfferedClassScheduleForm = dynamic(() => import("@/components/forms/admin/update/update-schedule"),
   { ssr: false, loading: () => <FormLoading /> })

type TProps = {
   sections: TOfferedCourseSection[];
   disciplines: TDiscipline[]
   rooms: TRoom[]
   semesterRegistrations: TSemesterRegistration[]
}


export function OfferedCourseSectionColumns({ disciplines, rooms, sections, semesterRegistrations }: TProps): ColumnDef<TClassShedule>[] {

   return [
      {
         accessorKey: "title",
         accessorFn: (row) => row.offeredCourseSectionId,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Turma"
               options={sections.map((section) => ({
                  value: section.id,
                  label: section.title
               }))}
            />
         ),
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
         accessorKey: "shift",
         accessorFn: (row) => row.shift,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Turno"
               options={[
                  { value: "Manhã", label: "Manhã" },
                  { value: "Tarde", label: "Tarde" },
                  { value: "Noite", label: "Noite" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const shift = row.original.shift.name
            return (
               <div className="flex items-center gap-2">
                  {shift === "Manhã" ?
                     <Sun className="text-yellow-300 size-4" />
                     :
                     shift === "Tarde" ?
                        <SunMoon className="text-amber-500" />
                        : <Moon className="text-blue-500 size-4" />}
                  <span>{shift}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "yearLevel",
         accessorFn: (row) => row.yearLevel,
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
            const yearLevel = row.original.yearLevel;
            return (
               <div className="flex items-center gap-3">
                  <Calendar className="text-indigo-500" />
                  <b>{showYearLevel(yearLevel)}</b>
               </div>
            )
         }
      },
      {
         accessorKey: "academicSemester",
         accessorFn: (row) => row.semester.title,
         header: ({ column }) => <UniversalColumnFilter
            column={column}
            title="Semestre academico"
            options={[
               { value: "1ºsemestre", label: "1º semestre" },
               { value: "2ºsemestre", label: "2º semestre" },
            ]}
         />,
         cell: ({ row }) => {
            const semester = row.original.semester;
            return (
               <div className="flex items-center gap-2">
                  <BookA className="text-indigo-500" />
                  <span className="truncate max-w-[180px]">{semester.title}</span>
               </div>
            )
         },
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const offeredCouse = row.original
            const handleDelete = async (id: string) => {
               try {
                  const res = await DeleteOfferedCourseSchedule(id);
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
            const handleDeleteByDiscipline = async (offeredCourseSectionId: string, disciplineId: string) => {
               try {
                  console.log({ offeredCourseSectionId, disciplineId });

                  const res = await DeleteOfferedCourseScheduleByDiscipline(offeredCourseSectionId, disciplineId);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
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
                     className="sm:max-w-full"
                     title={`Horário da ${offeredCouse.title} `}
                     description='Informações das desciplinas semestral'>
                     <TimetableGrid data={offeredCouse} onDelete={handleDeleteByDiscipline} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${offeredCouse.id}`}
                     className="sm:max-w-2xl"
                     title="Atualizar desciplinas semestra"
                     description='Formulário de atualização da desciplinas semestral'>
                     <UpdateOfferedClassScheduleForm
                        disciplines={disciplines}
                        offereSections={sections}
                        rooms={rooms}
                        semesterRegistration={semesterRegistrations}
                     />
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
