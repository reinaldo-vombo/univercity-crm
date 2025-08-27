// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheckIcon, Calendar1, Eye, Mail, Trash, User2 } from "lucide-react"
import Avatar from "@/components/shared/avatar"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { deleteUser } from "@/actions/users"
import { User } from "@/lib/helper/auth/user"
import { formatDate } from "@/lib/helper"

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
            const user = row.original;
            return (
               <Avatar name={user.name} photo={user.avatar} className="size-11" />
            );
         },
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "name",
         header: "Name",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <User2 className="h-4 w-4 text-green-500" />
               <b className="truncate max-w-[180px]">{row.getValue("name")}</b>
            </div>
         ),
      },
      {
         accessorKey: "email",
         header: "Email",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-red-500" />
               <b className="truncate max-w-[180px]">{row.getValue("email")}</b>
            </div>
         ),
      },
      {
         accessorKey: "role",
         header: "Cargo",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <BadgeCheckIcon className="h-4 w-4 text-yellow-500" />
               <b className="truncate max-w-[180px]">{row.getValue("role")}</b>
            </div>
         ),
      },
      {
         accessorKey: "createdAt",
         header: "Data de cadastro",
         cell: ({ row }) => (
            <div>
               <Calendar1 className="h-4 w-4 text-yellow-500" />
               <b className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</b>
            </div>
         ),
      },
      {
         id: "actions",
         header: 'Acção',
         cell: ({ row }) => {
            const users = row.original
            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteUser(id)
                  if (res.error) {
                     toast.error(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
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
                     helo
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
