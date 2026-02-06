// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Calendar1, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TSemester, TSemesterRegistration, } from "@/types/global"
import { deleteSemester } from "@/actions/semester"
import { formatDate } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
import { CompleteBage, ProgressBage, CloseBage } from "@/components/shared/bages"
const UpdateSemesterRegistrationForm = dynamic(() => import("@/components/forms/admin/update/update-semester-registration"),
   { ssr: false, loading: () => <FormLoading /> })


export function AcademicSemesterRegistartionColumns(academicSemester: TSemester[]): ColumnDef<TSemesterRegistration>[] {

   return [
      {
         accessorKey: "Estado",
         header: "status",
         cell: ({ row }) => {
            const status = row.original.status;
            return (
               <>
                  {status === 'UPCOMING'
                     ? <ProgressBage title="Brevemente" />
                     : status === 'ONGOING'
                        ? <CompleteBage title="Decorrendo" />
                        : <CloseBage title="Ecerrado" />}
               </>
            )
         },
      },
      {
         accessorKey: "startDate",
         header: "Data inicial",
         cell: ({ row }) => {
            const startDate = row.original.startDate;
            return (
               <div className="flex items-center gap-3">
                  <Calendar1 className="text-indigo-500" />
                  <b className="truncate max-w-[180px]">{formatDate(startDate)}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "endDate",
         header: "Data de encerramento",
         cell: ({ row }) => {
            const endDate = row.original.endDate;
            return (
               <div className="flex items-center gap-3">
                  <Calendar1 className="text-red-500" />
                  <b className="truncate max-w-[180px]">{formatDate(endDate)}</b>
               </div>
            )
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
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${semester.id}`}
                     title="Atualizar registro semester acadêmico"
                     description='Formulário de atualização do registro semester acadêmico'>
                     <UpdateSemesterRegistrationForm semesters={academicSemester} defaultValues={semester} />
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
