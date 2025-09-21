// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TActionHistory } from "@/types/global"
import { formatDate, formatTimeAgo } from "@/lib/helper"
import Avatar from "@/components/shared/avatar"
import { Badge } from "@/components/ui/badge"
import { deleteAudiLog } from "@/actions/activitiys"


export function AuditColumns(): ColumnDef<TActionHistory>[] {

   return [
      {
         accessorKey: "user",
         header: "Utilizador",
         cell: ({ row }) => {
            const user = row.original?.user
            return (
               <>
                  {user && (
                     <div className="flex items-center gap-2">
                        <Avatar name={user.name} photo={user.avatar} />
                        <div className="space-y-2">
                           <b>{user.name}</b>
                           <p className="text-slate-200">{user.email}</p>
                        </div>
                     </div>
                  )}
               </>

            )
         },
      },
      {
         accessorKey: "action",
         header: "Acção",
         cell: ({ row }) => {
            const action = row.original.action;
            return (
               <Badge className={`flex items-center gap-2 ${action === 'CREATE' ?
                  'bg-green-200 border-green-500'
                  : action === 'UPDATE' ? 'bg-orange-200 border-orange-500'
                     : action === 'DELETE' ? 'bg-red-200 border-red-500' : ''}`}>
                  <span
                     className={`size-2 rounded-full ${action === 'CREATE' ?
                        'bg-green-500 border-green-500'
                        : action === 'UPDATE' ? 'bg-orange-500 border-orange-500'
                           : action === 'DELETE' ? 'bg-red-500 border-red-500' : ''}`} />
                  <b>{action}</b>
               </Badge>
            )
         },
      },
      {
         accessorKey: "entityType",
         header: "Entidade",
         cell: ({ row }) => {
            const type = row.original.entityType
            return (
               <Badge>
                  <b>{type}</b>
               </Badge>
            )
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de registro",
         cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return (
               <div className="grid">
                  <span className="truncate max-w-[180px]">{formatDate(createdAt)}</span>
                  <span className="truncate max-w-[180px]">{formatTimeAgo(createdAt)}</span>
               </div>
            )
         }
      },
      {
         id: "actions",
         header: 'Acção',
         cell: ({ row }) => {
            const audit = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteAudiLog(id);
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
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(audit.id)} />
               </div>
            )
         },
      },
   ]
}
