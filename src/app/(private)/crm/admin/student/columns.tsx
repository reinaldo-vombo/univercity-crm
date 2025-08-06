// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Mail, Moon, Pen, Phone, Sun, Trash, User } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse, TSemester, TStudent } from "@/types/global"
import Avatar from "@/components/shared/avatar"
import { deleteFaculty } from "@/lib/actions/faculty"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeaderName } from "@/components/admin/table-filters/name-filter"
import StudentDetails from "@/components/admin/container/student-details"
import UpdatedStudentFrom from "@/components/forms/admin/update/updated-student"



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
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Tipo" />
         ),
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <User className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("studentType")}</span>
            </div>
         ),
      },
      {
         accessorKey: "isActive",
         header: "Status",
         cell: ({ row }) => (
            <Badge className={row.getValue("isActive") ? 'bg-green-500' : 'bg-red-500'}>
               {row.getValue("gender")}
            </Badge>
         ),
      },
      {
         accessorKey: "yearLevel",
         header: "Nivel",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("yearLevel")}</span>
            </div>
         ),
      },
      {
         accessorKey: "email",
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Email" />
         ),
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("email")}</span>
            </div>
         ),
      },
      {
         accessorKey: "gender",
         header: "Género",
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
               <Phone className="h-4 w-4 text-green-500" />
               <span>(+244) {row.getValue("contactNo")}</span>
            </div>
         ),
      },
      {
         accessorKey: "shift",
         header: "Turno",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               {row.getValue("shift") === "MORNING" ? <Sun className="text-yellow-300 size-4" /> : <Moon className="text-blue-500 size-4" />}
               <span>{row.getValue("shift")}</span>
            </div>
         ),
      },

      {
         id: "actions",
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

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     className="sm:max-w-md"
                     title="Detalhes do aluno"
                     description='Informções relecionadass ao aluno'>
                     <StudentDetails data={student} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     className="sm:max-w-md"
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
