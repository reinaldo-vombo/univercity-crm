// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TUser } from "@/lib/types/global"
import { AcademicFaculty } from "../academic-faculty/columns"
import Avatar from "@/components/sheard/avatar"
import { deleteDepartment } from "@/lib/actions/departement"
import DepartmenteDetails from "@/components/admin/departmente-details"
import UpdatedDepartmentForm from "@/components/forms/admin/update/update-department"

type TProps = {
   academicFaculty: string;
   director: TUser | undefined;
   id: string;
   title: string;
   createdAt?: Date;
   updatedAt?: Date;
   academicFacultyId: string;
   departmentHeadId: string | null;
}

export function DepartementColumns(users: TUser[], academicFaculty: AcademicFaculty[]): ColumnDef<TProps>[] {

   return [
      {
         accessorKey: "avatarUrl",
         header: "Direitor",
         cell: ({ row }) => {
            const user = row.original.director;
            return (
               <Avatar name={user?.name ?? ''} photo={user?.avatar ?? ''} className="size-11" />
            )
         }
      },
      {
         accessorKey: "title",
         header: "Nome",
      },
      {
         accessorKey: "academicFaculty",
         header: "Unidade",
      },
      {
         accessorKey: "createdAt",
         header: "Data de  criação",
      },


      {
         id: "actions",
         cell: ({ row }) => {
            const credits = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteDepartment(id);
                  if (res.error) {
                     toast.warning(res.message)
                  }
                  toast.success(FLASH_MESSAGE.DEPARTMENT_NOT_DELETED);
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
                     description='Visualizar detalhes do departamento'>
                     <DepartmenteDetails data={credits} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     title="Atualizar departamento"
                     description='Formulario para atualizar o departamento'>
                     <UpdatedDepartmentForm academicFaculty={academicFaculty} users={users} values={credits} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(credits.id)} />
               </div>
            )
         },
      },
   ]
}
