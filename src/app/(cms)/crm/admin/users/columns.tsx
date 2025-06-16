// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Trash } from "lucide-react"
import Avatar from "@/components/sheard/avatar"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { deleteUser } from "@/lib/actions/users"
import { User } from "@/lib/helper/auth/user"
import UserDetails from "@/components/user/user-details"

export type Users = {
   id: string
   name: string
   email: string
   role: string
   avatar: string
}

export function UsersColumns(): ColumnDef<Users>[] {
   const logUser = User()
   return [
      {
         accessorKey: "avatarUrl",
         header: "Avatar",
         cell: ({ row }) => {
            const student = row.original;

            return (
               <Avatar name={student.name} photo={student.avatar} className="size-11" />
            );
         },
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "name",
         header: "Name",
      },
      {
         accessorKey: "email",
         header: "Email",
      },
      {
         accessorKey: "role",
         header: "Cargo",
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const users = row.original
            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteUser(id)
                  if (res.error) {
                     toast.error(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.USER_DELETED);
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
                     title="Detalhes do útilizador"
                     description={`ID: ${users.id}`}>
                     <UserDetails
                        email={users.email}
                        name={users.name}
                        role={users.role} />
                  </SheetModal>
                  {logUser?.id === users.id ? null : (
                     <AlertModal
                        trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                        action={() => handleDelete(users.id)} />
                  )}
               </div>
            )
         },
      },
   ]
}
