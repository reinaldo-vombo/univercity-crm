// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BadgeDollarSign, Calendar, Eye, ListCollapse, Pen, Trash, User } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAdmitionExame } from "@/types/global"
import { Badge } from "@/components/ui/badge"
import AdmitionExameDetails from "@/components/admin/container/admition-exame/admition-exame-details"
import { deleteAdmitionExame } from "@/actions/admition-exame"
import { createUniqueId, formatCurrency, formatDate } from "@/lib/helper"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateAdmitionExameForm = dynamic(() => import("@/components/forms/admin/update/update-admition-exame"),
   { ssr: false, loading: () => <FormLoading /> })

export function AdmitionExameColumns(): ColumnDef<TAdmitionExame>[] {
   return [
      {
         accessorKey: "firstName",
         header: 'Nome Completo',
         cell: ({ row }) => {
            const firstName = row.original.firstName;
            const middleName = row.original.middleName || '';
            const lastName = row.original.lastName;
            return (
               <div className="flex items-center gap-3">
                  <User className="text-green-500" />
                  <span>
                     {`${firstName} ${middleName} ${lastName}`}
                  </span>
               </div>
            );
         },
      },
      {
         accessorKey: "fase",
         accessorFn: (row) => row.fase.name,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Fase Do exame"
               options={[
                  { value: "1", label: "1º fase" },
                  { value: "2", label: "2º fase" },
                  { value: "3", label: "3º fase" },
                  { value: "4", label: "4º fase" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const fase = row.original.fase.name;
            return (
               <div className="flex items-center gap-3">
                  <ListCollapse className="text-violet-600" />
                  <span>{fase}</span>
               </div>

            )
         },
      },
      {
         accessorKey: "exameDate",
         header: "Data do exame",
         cell: ({ row }) => {
            const date = row.original.exameDate;
            return (
               <div className="flex items-center gap-3">
                  <Calendar className="text-amber-500" />
                  <span>
                     {formatDate(date)}
                  </span>
               </div>
            );
         },
      },
      {
         accessorKey: "exameResults",
         header: "Resultado",
      },
      {
         accessorKey: "paymentAmoute",
         header: "Valor pago",
         cell: ({ row }) => {
            const price = row.original.paymentAmoute;
            return (
               <div className="flex items-center gap-2">
                  <BadgeDollarSign className="text-green-500" />
                  <b>{formatCurrency(price || 0)}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "passed",
         accessorFn: (row) => row.passed,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Situação"
               options={[
                  { value: "true", label: "Aprovado" },
                  { value: "false", label: "Reprovado" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const status = row.original.passed;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full text-white`}>
                  {status ? 'Apto' : 'Não apto'}
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
            const exames = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteAdmitionExame(id);
                  if (res.error) {
                     toast.error(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };
            const uid = createUniqueId("view");
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={uid}
                     title="Registro De Exame De Acesso"
                     className="sm:max-w-5xl"
                     description='Detalhes do  Regstro do Exame de Acesso'>
                     <AdmitionExameDetails data={exames} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${exames.id}`}
                     className="sm:max-w-md"
                     title="Registro De Exame De Acesso"
                     description='Formulario de Atualização do Exame de Acesso'>
                     <UpdateAdmitionExameForm values={exames} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(exames.id)} />
               </div>
            )
         },
      },
   ]
}
