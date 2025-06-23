// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAcademicFaculty, TDepartemant, TUser } from "@/lib/types/global"
import Avatar from "@/components/sheard/avatar"
import UpdatedDepartment from "@/components/forms/admin/update/update-department"
import DepartmenteDetails from "@/components/admin/departmente-details"
import { deleteDepartment } from "@/lib/actions/departement"

type TDepartmentWithUser = TDepartemant & {
   user?: TUser;
};

export function DepartmentColumns(users: TUser[], academicFaculty: TAcademicFaculty[]): ColumnDef<TDepartmentWithUser>[] {

   return [
      {
         accessorKey: "avatarUrl",
         header: "Director",
         cell: ({ row }) => {
            const user = row.original.user;

            return (
               <Avatar name={user?.name || ''} photo={user?.avatar || ''} className="size-11" />
            );
         },
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "title",
         header: "Name",
      },
      {
         accessorKey: "createdAt",
         header: "data de criação",
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const department = row.original
            const defaultValues = {
               id: department.id,
               title: department.title,
               academicFacultyId: department.academicFacultyId,
               departmentHeadId: department.departmentHeadId,
            }
            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteDepartment(id);
                  if (res.error) {
                     toast.warning(FLASH_MESSAGE.DEPARTMENT_NOT_DELETED);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DEPARTMENT_DELETED);
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
                     title="Detalhes do departamento"
                     description='Detalhes do departamento'>
                     <DepartmenteDetails users={users} academicFaculty={academicFaculty} department={department} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Atualização do departamento"
                     description='Formulario do departamento'>
                     <UpdatedDepartment users={users} academicFaculty={academicFaculty} values={defaultValues} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(department.id)} />
               </div>
            )
         },
      },
   ]
}
