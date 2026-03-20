// components/mark-sheet/mark-sheet-columns.tsx
import type { ColumnDef } from "@tanstack/react-table"
import { TRequest } from "@/types/global"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import Modal from "@/components/shared/Modal"
import { Pen } from 'lucide-react';
import dynamic from "next/dynamic"
import FormLoading from "@/components/skeleton/form"
import Avatar from "@/components/shared/avatar";
const ReviewCourseTransfer = dynamic(() => import("@/components/forms/post/review-course-transfer"),
   { ssr: false, loading: () => <FormLoading /> })

const TYPE_LABELS: Record<string, string> = {
   COURSE_TRANSFER: "Troca de Curso",
   SHIFT_TRANSFER: "Troca de Turno",
   DEBT_EXCEPTION: "Excepção de Dívida",
};

const STATUS_STYLES: Record<string, string> = {
   PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
   APPROVED: "bg-green-100  text-green-700  border-green-200",
   REJECTED: "bg-red-100    text-red-700    border-red-200",
   COMPLETED: "bg-blue-100   text-blue-700   border-blue-200",
};

const STATUS_LABELS: Record<string, string> = {
   PENDING: "Pendente",
   APPROVED: "Aprovado",
   REJECTED: "Rejeitado",
   COMPLETED: "Concluído",
};

export function RequestsColumns(): ColumnDef<TRequest>[] {
   return [
      {
         accessorKey: "student",
         accessorFn: (row) => row.student.name,
         header: "Aluno",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Avatar name={row.original.student.name} photo={row.original.student.profileImage || ''} />
               <div>
                  <h2 className="font-medium text-gray-800 dark:text-white">{row.original.student.name}</h2>
                  <p className="text-xs text-gray-400">{row.original.student.studentId}</p>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "type",
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Tipo"
               options={[
                  { value: "COURSE_TRANSFER", label: "Troca de Curso" },
                  { value: "SHIFT_TRANSFER", label: "Troca de Turno" },
                  { value: "DEBT_EXCEPTION", label: "Excepção de Dívida" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
               {TYPE_LABELS[row.original.type] ?? row.original.type}
            </span>
         ),
      },
      {
         accessorKey: "details",
         accessorFn: (row) => `${row.details.from} ${row.details.to}`,
         header: "De → Para",
         cell: ({ row }) => (
            <div className="text-sm">
               <span className="text-red-500 ">{row.original.details.from}</span>
               <span className="mx-1 text-gray-300">→</span>
               <span className="font-medium text-green-500">{row.original.details.to}</span>
            </div>
         ),
      },
      {
         accessorKey: "semester",
         accessorFn: (row) => `${row.semester.title} ${row.semester.year}`,
         header: "Semestre",
         cell: ({ row }) => (
            <span className="text-xs text-gray-500">
               {row.original.semester.title} {row.original.semester.year}
            </span>
         ),
      },
      {
         accessorKey: "status",
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Estado"
               options={[
                  { value: "PENDING", label: "Pendente" },
                  { value: "APPROVED", label: "Aprovado" },
                  { value: "REJECTED", label: "Rejeitado" },
                  { value: "COMPLETED", label: "Concluído" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[row.original.status]}`}>
               {STATUS_LABELS[row.original.status] ?? row.original.status}
            </span>
         ),
      },
      {
         accessorKey: "createdAt",
         header: "Data",
         cell: ({ row }) => (
            <span className="text-xs text-gray-400">
               {new Date(row.original.createdAt).toLocaleDateString("pt-AO")}
            </span>
         ),
      },
      {
         id: "actions",
         header: "Acções",
         cell: ({ row }) =>
            row.original.status === "PENDING" ? (
               <Modal
                  title={`Formulario de atualização do pedido de ${TYPE_LABELS[row.original.type]}`}
                  description={`Aluno ${row.original.student.name} solicitou ${TYPE_LABELS[row.original.type]}`}
                  trigger={<Pen className="h-4 w-4  cursor-pointer" />}
               >
                  <div className='space-y-3 mb-4'>
                     <h2 className=''>Motivo da solicitação:</h2>
                     <p>-{row.original.reason || 'Motivo não especificado'}</p>
                  </div>
                  {row.original.type === 'COURSE_TRANSFER' ? <ReviewCourseTransfer /> : null}
               </Modal>
            ) : null,
      },
   ]
}