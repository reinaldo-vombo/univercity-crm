// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BookA, BookCheck, BookDashed, Calendar, Eye, Hash, Link, Moon, Pen, Sun, SunMoon, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TDiscipline, TFaculty } from "@/types/global"
import { deleteDiscipline } from "@/actions/discipline"
import UpdateDisciplineForm from "@/components/forms/admin/update/update-discipline"
import { createUniqueId, showYearLevel } from "@/lib/helper"
import FacultyDisciplineAssignmentForm from "@/components/forms/admin/post/assing-faculty-dicipline"
import DisciplineDetails from "@/components/admin/container/discipline-details"
import { UniversalColumnFilter } from "@/components/admin/table-filters/column-filter"

export function DisciplineColumns(faculty: TFaculty[]): ColumnDef<TDiscipline>[] {

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
         accessorFn: (row) => row.courses?.[0]?.semester ?? null,
         header: ({ column }) => <UniversalColumnFilter
            column={column}
            title="Semestre academico"
            options={[
               { value: "1 semestre", label: "1º semestre" },
               { value: "2 semestre", label: "2º semestre" },
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
            const title = row.original.courses[0]?.semester;
            const year = row.original.courses[0]?.year;
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
         accessorKey: "shift",
         accessorFn: (row) => row.courses[0].shift,
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
            if (!row.original.courses) {
               return (
                  <div className="flex items-center gap-3">
                     <Sun className="text-purple-500" />
                     <b>Sem Turno</b>
                  </div>
               )
            }
            const shift = row.original.courses[0]?.shift;
            return (
               <div className="flex items-center gap-2">
                  {shift === "Manha" ?
                     <Sun className="text-yellow-300 size-4" />
                     :
                     shift === "Tarde" ?
                        <SunMoon className="text-amber-500" />
                        : <Moon className="text-blue-500 size-4" />}
                  <span>{shift}</span>
               </div>
            )
         }
      },
      {
         accessorKey: "code",
         header: "Codigo",
         cell: ({ row }) => {
            const code = row.original.code;
            return (
               <div className="flex items-center gap-3">
                  <Hash className="text-amber-500" />
                  <b>{code}</b>
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
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
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
                     <UpdateDisciplineForm values={discipline} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Link className="h-4 w-4 text-purple-500 cursor-pointer" />}
                     side="right"
                     id={`atribut-${uid1}`}
                     title="Atribuir Professor a Disciplina"
                     description='Formulario para atribuir a disciplina a um professor'>
                     <FacultyDisciplineAssignmentForm disciplineId={discipline.id} facultys={faculty} />
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
