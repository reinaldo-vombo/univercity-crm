// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { BadgeDollarSign, Currency, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TPrice } from "@/types/global"
import { deletePrice } from "@/actions/price"
import { formatCurrency, formatDate } from "@/lib/helper"
import { Badge } from "@/components/ui/badge"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdatePriceForm = dynamic(() => import("@/components/forms/admin/update/update-price"),
   { ssr: false, loading: () => <FormLoading /> })


export function PriceColumns(): ColumnDef<TPrice>[] {

   return [
      {
         accessorKey: "amount",
         header: "Preço",
         cell: ({ row }) => {
            const amount = row.original.amount;
            return (
               <div className="flex items-center gap-2">
                  <BadgeDollarSign className="text-green-500" />
                  <b>{formatCurrency(amount || 0)}</b>
               </div>
            )
         },
      },
      {
         accessorKey: "currency",
         header: "Moeda",
         cell: ({ row }) => {
            const currency = row.original.currency;
            return (
               <Badge className="flex items-center text-white bg-green-800 gap-2">
                  <Currency className="text-green-500 " />
                  <b>{currency}</b>
               </Badge>
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
         accessorKey: "updatedAt",
         header: "Data de  atualização",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("updatedAt"))}</span>
         ),
      },
      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const credits = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deletePrice(id);
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

                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     id={`edit-${credits.id}`}
                     title="Atualizar curso"
                     description='Formulario para atualizar o curso'>
                     <UpdatePriceForm defaultValue={credits} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(credits.id)} />
               </div>
            )
         },
      },
   ]
}
