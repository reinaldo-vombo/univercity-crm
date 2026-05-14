// lib/columns/studentColumns.ts
import dynamic from "next/dynamic"
import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheckIcon, ChevronsUpDown, Eye, Pen, Trash } from "lucide-react"
import Avatar from "@/components/shared/avatar"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { deleteUser } from "@/actions/users"
import { User } from "@/lib/helper/auth/user"
import { createUniqueId, formatDate } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import { TBulkUser } from "@/types/global"
import UserDetailsPage from "@/components/admin/container/user/sigle-user-details"
const UpdatedUserForm = dynamic(() => import("@/components/forms/admin/update/update-user"),
   { ssr: false, loading: () => <FormLoading /> })

export function UsersColumns(): ColumnDef<TBulkUser>[] {
   const logUser = User()
   return [
      {
         accessorKey: "name",
         header: ({ column }) => (
            <button
               className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Utilizador
               <ChevronsUpDown className="size-3 opacity-50" />
            </button>
         ),
         cell: ({ row }) => {
            const name = row.original.name
            const avatar = row.original.avatar
            const isActive = row.original.isActive
            return (
               <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                     <Avatar name={name} photo={avatar || ''} className="size-9 rounded-full ring-2 ring-slate-100" />
                     <span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white ${isActive ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                  </div>
                  <span className="font-semibold text-sm text-slate-800 truncate max-w-[160px]">{name}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "email",
         header: () => (
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Email</span>
         ),
         cell: ({ row }) => (
            <span className="text-sm text-slate-500 truncate max-w-[180px] block">{row.getValue("email")}</span>
         ),
      },
      {
         accessorKey: "role",
         header: () => (
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Cargo</span>
         ),
         cell: ({ row }) => {
            const role: string = row.getValue("role")
            const styles: Record<string, string> = {
               super_admin: 'bg-amber-50 text-amber-700 border-amber-200',
               admin: 'bg-violet-50 text-violet-700 border-violet-200',
               user: 'bg-slate-50 text-slate-600 border-slate-200',
            }
            const cls = styles[role] ?? 'bg-slate-50 text-slate-600 border-slate-200'
            return (
               <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
                  <BadgeCheckIcon className="size-3" />
                  {role}
               </span>
            )
         },
      },
      {
         accessorKey: "createdAt",
         header: ({ column }) => (
            <button
               className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Cadastro
               <ChevronsUpDown className="size-3 opacity-50" />
            </button>
         ),
         cell: ({ row }) => (
            <span className="text-sm text-slate-500">{formatDate(row.getValue("createdAt"))}</span>
         ),
      },
      {
         id: "actions",
         header: () => (
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Ações</span>
         ),
         cell: ({ row }) => {
            const users = row.original
            const uid = createUniqueId("view")
            const isSelf = logUser?.id === users.id
            const isSuperAdmin = logUser?.role === 'super_admin'

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteUser(id)
                  if (res.error) { toast.error(res.message); return }
                  toast.success(FLASH_MESSAGE.DELETED)
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR)
                  console.error(err)
               }
            }

            return (
               <div className="flex items-center gap-1">
                  <SheetModal
                     trigger={
                        <button className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Ver detalhes">
                           <Eye className="size-4" />
                        </button>
                     }
                     side="right" id={uid} className="sm:max-w-md"
                     title={`Detalhes — ${users.name}`}
                     description="Informações do utilizador"
                  >
                     <UserDetailsPage user={users} />
                  </SheetModal>

                  {!isSelf && isSuperAdmin && (
                     <SheetModal
                        trigger={
                           <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Editar">
                              <Pen className="size-4" />
                           </button>
                        }
                        side="right" id={`edit-${users.id}`} className="sm:max-w-md"
                        title="Atualizar utilizador"
                        description="Formulário de atualização"
                     >
                        <UpdatedUserForm userInf={users} />
                     </SheetModal>
                  )}

                  {!isSelf && isSuperAdmin && (
                     <AlertModal
                        trigger={
                           <button className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Eliminar">
                              <Trash className="size-4" />
                           </button>
                        }
                        action={() => handleDelete(users.id)}
                     />
                  )}
               </div>
            )
         },
      },
   ]
}
