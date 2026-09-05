// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Calendar1, CalendarArrowDownIcon, CalendarCheck, CalendarDays, Hash, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TSemester, } from "@/types/global"
import { deleteSemester } from "@/actions/semester"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateSemesterForm = dynamic(() => import("@/components/forms/admin/update/update-semester"),
   { ssr: false, loading: () => <FormLoading /> })


export function AcademicSemesterColumns(): ColumnDef<TSemester>[] {

   return [
      {
         accessorKey: "title",
         header: "Periodo",
         cell: ({ row }) => {
            const title = row.original.title;
            return (
               <div className="flex items-center gap-3">
                  <CalendarDays className="text-violet-500" />
                  <b className="truncate max-w-[180px]">{title}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "year",
         header: "Ano corrente",
         cell: ({ row }) => {
            const year = row.original.year;
            return (
               <div className="flex items-center gap-3">
                  <Calendar1 className="text-indigo-500" />
                  <b className="truncate max-w-[180px]">{year}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "code",
         header: "Codigo",
         cell: ({ row }) => {
            const code = row.original.code;
            return (
               <div className="flex items-center gap-3">
                  <Hash className="text-amber-500" />
                  <b className="truncate max-w-[180px]">{code}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "startMonth",
         header: "Incío",
         cell: ({ row }) => {
            const startMonth = row.original.startMonth;
            return (
               <div className="flex items-center gap-3">
                  <CalendarCheck className="text-green-500" />
                  <span className="truncate max-w-[180px]">{startMonth}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "endMonth",
         header: "Encerramento",
         cell: ({ row }) => {
            const endMonth = row.original.endMonth;
            return (
               <div className="flex items-center gap-3">
                  <CalendarArrowDownIcon className="text-red-500" />
                  <span className="truncate max-w-[180px]">{endMonth}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "isCurrent",
         header: "Status",
         cell: ({ row }) => {
            const status = row.original.isCurrent;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
                  {status ? 'Decorrendo' : 'Terminado'}
               </Badge>
            );
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de  publicação",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</span>
         ),
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const semester = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteSemester(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.SERVER_ERROR);
                  console.error(err);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${semester.id}`}
                     title="Atualizar semester acadêmico"
                     description='Formulário de atualização do semester acadêmico'>
                     <UpdateSemesterForm values={semester} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(semester.id)} />
               </div>
            )
         },
      },
   ]
}
