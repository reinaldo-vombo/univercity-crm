// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Calendar, CalendarArrowUp, Eye, Mail, Moon, Pen, Phone, Sun, SunMoon, Trash, User } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse, TSemester, TStudent } from "@/types/global"
import Avatar from "@/components/shared/avatar"
import { deleteFaculty } from "@/actions/faculty"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeaderName } from "@/components/table-filters/name-filter"
import StudentDetails from "@/components/admin/container/student/student-details"
import { createUniqueId, formatDate } from "@/lib/helper"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdatedStudentFrom = dynamic(() => import("@/components/forms/admin/update/updated-student"),
   { ssr: false, loading: () => <FormLoading /> })



export function StudentColumns(academicSemester: TSemester[], courses: TCourse[]): ColumnDef<TStudent>[] {

   return [
      {
         accessorKey: "profileImage",
         header: "Avatar",
         cell: ({ row }) => {
            const faculty = row.original;
            const name = `${faculty.firstName} ${faculty.lastName}`

            return (
               <Avatar name={name || '/default-img-1.jpeg'} photo={faculty?.profileImage || ''} className="size-11" />
            );
         },
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "firstName",
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Nome" />
         ),
         cell: ({ row }) => {
            const student = row.original;
            const name = `${student.firstName} ${student.lastName}`
            return (
               <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-500" />
                  <span>{name}</span>
               </div>
            )
         },
      },

      {
         accessorKey: "studentType",
         accessorFn: (row) => row.studentType ?? null,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Tipo de aluno"
               options={[
                  { value: "NORMAL", label: "Normal" },
                  { value: "CADEIRANTE", label: "Cadeirante" },
                  { value: "BOLSEIRO", label: "Bolseiro" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <User className="h-4 w-4 text-violet-500" />
               <span className="truncate max-w-[180px]">{row.getValue("studentType")}</span>
            </div>
         ),
      },
      {
         accessorKey: "isActive",
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Situação"
               options={[
                  { value: "true", label: "Activo" },
                  { value: "false", label: "Inactivo" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <Badge className={row.getValue("isActive") ? 'bg-green-500' : 'bg-red-500'}>
               {row.getValue("isActive")}
            </Badge>
         ),
      },
      {
         accessorKey: "yearLevel",
         accessorFn: (row) => row.yearLevel ?? null,
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
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <CalendarArrowUp className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("yearLevel")}</span>
            </div>
         ),
      },
      {
         accessorKey: "email",
         header: 'Email',
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("email")}</span>
            </div>
         ),
      },
      {
         accessorKey: "gender",
         accessorFn: (row) => row.gender,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Género"
               options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <Badge className={row.getValue("gender") === 'masculino' ? 'bg-blue-500' : 'bg-pink-500'}>
               {row.getValue("gender")}
            </Badge>
         ),
      },
      {
         accessorKey: "contactNo",
         header: "Telefone",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Phone className="h-4 w-4 text-blue-500" />
               <span>(+244) {row.getValue("contactNo")}</span>
            </div>
         ),
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
                  {shift === "Manha" ?
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
         accessorKey: "createdAt",
         header: "Data de cadastro",
         cell: ({ row }) => (
            <div>
               <Calendar className="h-4 w-4 text-yellow-500" />
               <b className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</b>
            </div>
         ),
      },

      {
         id: "actions",
         header: 'Acção',
         cell: ({ row }) => {
            const student = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteFaculty(id);
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
                     id={`view-${uid}`}
                     className="sm:max-w-md"
                     title="Detalhes do aluno"
                     description='Informções relecionadass ao aluno'>
                     <StudentDetails data={student} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${student.id}`}
                     className="sm:max-w-lg"
                     title="Atualização do aluno"
                     description='Formulario de atualização do aluno'>
                     <UpdatedStudentFrom academicSemester={academicSemester} courses={courses} defaultValue={student} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(student.id)} />
               </div>
            )
         },
      },
   ]
}
