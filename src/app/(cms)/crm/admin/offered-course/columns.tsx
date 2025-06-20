// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import axios from "axios"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAcademicFaculty, TDepartemant, TUser } from "@/lib/types/global"
import UpdatedDepartment from "@/components/forms/admin/update/update-department"
import DepartmenteDetails from "@/components/admin/departmente-details"

type TDepartmentWithUser = TDepartemant & {
   user?: TUser;
};

export function OfferdCourseColumns(users: TUser[], academicFaculty: TAcademicFaculty[]): ColumnDef<TDepartmentWithUser>[] {

   return [
      {
         accessorKey: "academicFaculty",
         header: "Faculty",
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
                  const res = await axios.delete(`/academic-department/${id}`,);
                  const result = await res.data;
                  if (!res.data.success) {
                     toast.error(result.error || "Failed to delete user.");
                     return;
                  }
                  toast.success(FLASH_MESSAGE.USER_DELETED);
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
                     description={`ID: ${department.id}`}>
                     <DepartmenteDetails users={users} academicFaculty={academicFaculty} department={department} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do departamento"
                     description={`ID: ${department.id}`}>
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
