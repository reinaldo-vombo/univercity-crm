// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import SheetModal from "@/components/shared/sheet-modal";
import AlertModal from "@/components/shared/alert-modal";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { deleteFaculty } from "@/actions/academic-faculty";
import { TAcademicFaculty, TPrice } from "@/types/global";
import { handleApiError } from "@/services/error-handler";
import { formatDate } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpadateAcademicFaculty = dynamic(() => import("@/components/forms/admin/update/update-academic-faculty"),
   { ssr: false, loading: () => <FormLoading /> })

export function AcademicFacultyColumns(prices: TPrice[]): ColumnDef<TAcademicFaculty>[] {
   return [
      {
         accessorKey: "title",
         header: "Titulo",
      },
      {
         accessorKey: "createdAt",
         header: "Data de Publicação",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</span>
         ),
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const academic = row.original
            const handleDelete = async (id: string) => {

               try {
                  const res = await deleteFaculty(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (error) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  handleApiError(error);
               }
            };

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${academic.id}`}
                     title="Atualizar Unidade Academica"
                     description='Formulario para atualizar Unidade Academica'>
                     <UpadateAcademicFaculty values={academic} prices={prices} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(academic.id)} />
               </div>
            )
         },
      },
   ]
}
