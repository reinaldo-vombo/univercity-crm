// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/sheard/sheet-modal"
import AlertModal from "@/components/sheard/alert-modal"
import { toast } from "sonner"
import axios from "axios"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TAdmitionExame } from "@/lib/types/global"
import { Badge } from "@/components/ui/badge"
import UpdateAdmitionExameForm from "@/components/forms/admin/update/update-admition-exame"
import AdmitionExameDetails from "@/components/admin/admition-exame-details"


export function AdmitionExameColumns(): ColumnDef<TAdmitionExame>[] {

   return [
      {
         accessorKey: "applicantName",
         header: "Name",
      },
      {
         accessorKey: "fase",
         header: "Faze",
      },
      {
         accessorKey: "exameDate",
         header: "Data do exame",
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
         header: "Pagamento",
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
         header: "Situação",
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
                  const res = await axios.delete(`/academic-department/${id}`,);
                  const result = await res.data;
                  if (!res.data.success) {
                     toast.error(result.error || "Failed to delete user.");
                     return;
                  }
                  toast.success(FLASH_MESSAGE.USER_DELETED);
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
