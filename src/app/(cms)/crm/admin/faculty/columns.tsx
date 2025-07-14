// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Mail, Moon, Pen, Phone, Sun, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAcademicFaculty, TDepartemant, TFaculty } from "@/lib/types/global"
import Avatar from "@/components/sheard/avatar"
import { deleteFaculty } from "@/lib/actions/faculty"
import UpdateFacultyFrom from "@/components/forms/admin/update/update-falculty"
import FalcultyDetails from "@/components/admin/falculty-details"
import { Badge } from "@/components/ui/badge"

// type TDepartmentWithUser = TDepartemant & {
//    user?: TUser;
// };

export function FacultyColumns(departemants: TDepartemant[], academicFaculty: TAcademicFaculty[]): ColumnDef<TFaculty>[] {

   return [
      {
         accessorKey: "profileImage",
         header: "Avatar",
         cell: ({ row }) => {
            const faculty = row.original;
            const name = `${faculty.firstName} ${faculty.lastName}`

            return (
               <div className="flex items-center gap-2">
                  <Avatar name={name || ''} photo={faculty?.profileImage || ''} className="size-11" />
                  <span>{name}</span>
               </div>
            );
         },
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "academicDepartment",
         header: "Departamento",
         cell: ({ row }) => (
            <Badge variant="secondary" className="text-xs">
               {row.getValue("academicDepartment")}
            </Badge>
         ),
      },
      {
         accessorKey: "designation",
         header: "Designação",
         cell: ({ row }) => (
            <Badge variant="secondary" className="text-xs">
               {row.getValue("designation")}
            </Badge>
         ),
      },
      // {
      //    accessorKey: "firstName",
      //    header: "Nome",
      //    cell: ({ row }) => (
      //       <div className="flex items-center gap-2">
      //          <User className="h-4 w-4 text-muted-foreground" />
      //          <span>{row.getValue("firstName")}</span>
      //       </div>
      //    ),
      // },
      {
         accessorKey: "email",
         header: "Email",
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
            <Badge className={row.getValue("gender") === 'masculino' ? 'bg-blue-500' : 'bg-pink-500'}>{row.getValue("gender")}</Badge>
         ),
      },
      {
         accessorKey: "contactNo",
         header: "Telefone",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Phone className="h-4 w-4 text-green-500" />
               <span>{row.getValue("contactNo")}</span>
            </div>
         ),
      },
      {
         accessorKey: "shift",
         header: "Turno",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               {row.getValue("shift") === "day" ? <Sun className="text-yellow-300 size-4" /> : <Moon className="text-blue-500 size-4" />}
               <span>{row.getValue("shift")}</span>
            </div>
         ),
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const falculty = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteFaculty(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.FACULTY_DELETED);
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
                     title="Detalhes do professore"
                     description='Informções relecionadass ao professore'>
                     <FalcultyDetails data={falculty} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     className="sm:max-w-md"
                     title="Atualização do professore"
                     description='Formulario de atualização do professore'>
                     <UpdateFacultyFrom departemants={departemants} academicFaculty={academicFaculty} defaultValues={falculty} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(falculty.id)} />
               </div>
            )
         },
      },
   ]
}
