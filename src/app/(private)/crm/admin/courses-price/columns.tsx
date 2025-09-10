// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TPrice } from "@/types/global"
import UpdatePriceForm from "@/components/forms/admin/update/update-price"
import { deletePrice } from "@/actions/price"
import { formatDate } from "@/lib/helper"


export function PriceColumns(): ColumnDef<TPrice>[] {

   return [
      {
         accessorKey: "amount",
         header: "Preço",
      },
      {
         accessorKey: "currency",
         header: "Moeda",
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
                     title="Atualizar curso"
                     description=' Formulario para atualizar o curso'>
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
