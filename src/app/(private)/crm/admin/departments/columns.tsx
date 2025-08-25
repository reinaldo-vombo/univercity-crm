// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BookAIcon, Building, Calendar, Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TUser } from "@/types/global"
import { AcademicFaculty } from "../academic-faculty/columns"
import Avatar from "@/components/shared/avatar"
import { deleteDepartment } from "@/actions/departement"
import DepartmenteDetails from "@/components/admin/container/departmente-details"
import UpdatedDepartmentForm from "@/components/forms/admin/update/update-department"
import { formatDate } from "@/lib/helper"

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
               <div className="flex items-center gap-2">
                  <Avatar
                     name={user?.name ?? ''}
                     photo={user?.avatar ?? '/books.jpeg'}
                     className="size-11" />
                  <p>{user?.name ?? ''}</p>
               </div>
            )
         }
      },
      {
         accessorKey: "title",
         header: "Nome",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Building className="h-4 w-4 text-green-500" />
               <span className="truncate max-w-[180px]">{row.getValue("title")}</span>
            </div>
         ),
      },
      {
         accessorKey: "academicFaculty",
         header: "Unidade Acadêmica",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <BookAIcon className="h-4 w-4 text-orange-500" />
               <span className="truncate max-w-[180px]">{row.getValue("academicFaculty")}</span>
            </div>
         ),
      },
      {
         accessorKey: "createdAt",
         header: "Data de  criação",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Calendar className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</span>
            </div>
         ),
      },


      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const credits = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteDepartment(id);
                  if (res.error) {
                     toast.warning(res.message)
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
