// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { TExames } from "@/types/global"
import { createUniqueId, formatDate, } from "@/lib/helper"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import Avatar from "@/components/shared/avatar"
import { Badge } from "@/components/ui/badge"
import { RetakeDetails } from "@/components/admin/container/retake/details"
// import FormLoading from "@/components/skeleton/form"
// import dynamic from "next/dynamic"
// const UpdateAdmitionExameForm = dynamic(() => import("@/components/forms/admin/update/update-admition-exame"),
//    { ssr: false, loading: () => <FormLoading /> })



export function RetakeExameColumns(): ColumnDef<TExames>[] {
   return [
      {
         accessorKey: "student",
         header: 'Estudante',
         accessorFn: (row) => row.student.name,
         cell: ({ row }) => {
            const student = row.original.student;

            return (
               <div className="flex items-center gap-3">
                  <Avatar name={student.profileImage ?? ''} photo={student.profileImage ?? ''} />
                  <span>
                     {student.name}
                  </span>
               </div>
            );
         },
      },
      {
         accessorKey: "discipline",
         accessorFn: (row) => row.discipline.name,
         header: "Disciplina",
         cell: ({ row }) => (
            <span className="text-sm">{row.original.discipline.name}</span>
         ),
      },
      {
         accessorKey: "section",
         accessorFn: (row) => row.section.title,
         header: "Turma",
         cell: ({ row }) => (
            <div>
               <p className="text-sm">{row.original.section.title}</p>
               <p className="text-xs text-gray-400">{row.original.section.shift}</p>
            </div>
         ),
      },
      {
         accessorKey: "date",
         header: "Data",
         cell: ({ row }) => (
            <div>
               <p className="text-sm">{formatDate(row.original.date)}</p>
               <p className="text-xs text-gray-400">{row.original.time}</p>
            </div>
         ),
      },
      {
         accessorKey: "location",
         accessorFn: (row) => row.location.building,
         header: "Local",
         cell: ({ row }) => (
            <div>
               <p className="text-sm">{row.original.location.building}</p>
               <p className="text-xs text-gray-400">Sala {row.original.location.room}</p>
            </div>
         ),
      },
      {
         accessorKey: "payment",
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Pagamento"
               options={[
                  { value: "PAID", label: "Pago" },
                  { value: "NOT_PAID", label: "Não pago" },
                  { value: "PENDING", label: "Pendente" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <Badge className={{
               PAID: "bg-green-100 text-green-700",
               NOT_PAID: "bg-red-100   text-red-700",
               PENDING: "bg-yellow-100 text-yellow-700",
               OVERDUE: '',
            }[row.original.payment] ?? ""}>
               {{ PAID: "Pago", NOT_PAID: "Não pago", PENDING: "Pendente", OVERDUE: '' }[row.original.payment]}
            </Badge>
         ),
      },

      {
         id: "actions",
         cell: ({ row }) => {
            const exames = row.original;
            const uid = createUniqueId("view");
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={uid}
                     title="Detalhes do Exame de Recurso"
                     className="sm:max-w-lg"
                     description='Detalhes do Regstro do Exame de Recurso'>
                     <RetakeDetails data={exames} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${exames.id}`}
                     title="Registro De Exame De Acesso"
                     description='Formulario de Atualização do Exame de Acesso'>
                     update
                  </SheetModal>
               </div>
            )
         },
      },
   ]
}
