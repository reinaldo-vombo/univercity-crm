// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAdmitionExame } from "@/types/global"
import { Badge } from "@/components/ui/badge"
import UpdateAdmitionExameForm from "@/components/forms/admin/update/update-admition-exame"
import AdmitionExameDetails from "@/components/admin/container/admition-exame-details"
import { DataTableColumnHeaderName } from "@/components/admin/table-filters/name-filter"
import { FaseColumnFilter } from "@/components/admin/table-filters/Fase-column-filter"
import { BoolenColumnFilter } from "@/components/admin/table-filters/boolen-column-filter"
import { deleteAdmitionExame } from "@/lib/actions/admition-exame"
import config from '@/config/env'
import { formatDate } from "@/lib/helper"

export function AdmitionExameColumns(): ColumnDef<TAdmitionExame>[] {

   console.log('url', config.API_ASSETS);
   return [
      {
         accessorKey: "applicantName",
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Nome" />
         ),
      },
      {
         accessorKey: "fase",
         header: ({ column }) => <FaseColumnFilter column={column} />,
         cell: ({ row }) => {
            const fase = row.original.fase.name;
            return (
               <span>{fase}</span>

            )
         },
      },
      {
         accessorKey: "exameDate",
         header: "Data do exame",
         cell: ({ row }) => {
            const date = row.original.exameDate;
            return (
               <span>
                  {formatDate(date)}
               </span>
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
      },
      {
         accessorKey: "aprovePayment",
         header: ({ column }) => <BoolenColumnFilter column={column} name="Pagamento" />,
         cell: ({ row }) => {
            const status = row.original.aprovePayment;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
                  {status ? 'Confirmado' : 'Pendente'}
               </Badge>
            );
         },
      },
      {
         accessorKey: "passed",
         header: ({ column }) => <BoolenColumnFilter column={column} name="Situação" />,
         cell: ({ row }) => {
            const status = row.original.passed;
            return (
               <Badge className={`${status ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
                  {status ? 'Apto' : 'Não apto'}
               </Badge>
            );
         },
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

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Detalhes do exame de admisão"
                     description='Detalhes do exame de admisão'>
                     <AdmitionExameDetails data={exames} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     title="Atualizar exame de admisão"
                     description='Atualizar exame de admisão'>
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
