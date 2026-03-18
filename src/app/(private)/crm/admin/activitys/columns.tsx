// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { TActionHistory, TUser } from "@/types/global";
import { formatDate, formatTimeAgo } from "@/lib/helper";
import Avatar from "@/components/shared/avatar";
import { Badge } from "@/components/ui/badge";
import { CloseBage, CompleteBage, ProgressBage } from "@/components/shared/bages";
import { UniversalColumnFilter } from "@/components/table-filters/column-filter";
import SheetModal from "@/components/shared/sheet-modal";
import AuditDetails from "@/components/admin/container/audit-details";


export function AuditColumns(users: TUser[]): ColumnDef<TActionHistory>[] {

   return [
      {
         accessorKey: "User",
         accessorFn: (row) => row.userId,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Ùtilizadores"
               options={users.map((user) => ({
                  value: user.id,
                  label: user.name
               }))}
            />
         ),
         cell: ({ row }) => {
            const user = row.original?.user;

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
         accessorFn: (row) => row.action,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Acção"
               options={[
                  { value: "CREATE", label: "Criação" },
                  { value: "UPDATE", label: "Atualização" },
                  { value: "DELETE", label: "Exclusão" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const action = row.original.action;
            return (
               < >
                  {action === 'CREATE'
                     ? <CompleteBage title={action} />
                     :
                     action === 'UPDATE' ? <ProgressBage title={action} />
                        :
                        action === 'DELETE' ? <CloseBage title={action} /> : null
                  }
               </>
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
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`vew-${audit.id}`}
                     title="Detalhes do Registro"
                     className="sm:max-w-lg"
                     description='Decrição do Registro'>
                     <AuditDetails audit={audit} />
                  </SheetModal>
               </div>
            )
         },
      },
   ]
}
