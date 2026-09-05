"use client";
import dynamic from "next/dynamic"
import { DataTable } from "@/components/shared/tabeles/data-table";
import { TExames } from "@/types/global";
import { RetakeExameColumns } from "./columns";
import { createSelectCalumn } from "@/components/table-filters/select-column-def";
import { useSheet } from "@/providers/sheet-provider";
import { useState } from "react";
import { createUniqueId } from "@/lib/helper";
import SheetModal from "@/components/shared/sheet-modal";
import FormLoading from "@/components/skeleton/form";
const BulkUpdateRetake = dynamic(() => import("@/components/forms/admin/update/bulk-update-retake"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   exames: TExames[];
}
const bulkId = createUniqueId("bulk-updat");
export function RetakeExameTable({ exames, }: Props) {
   const [selectedIds, setSelectedIds] = useState<number[]>([])
   const { open } = useSheet()

   // const columns = RetakeExameColumns();
   const columns = [
      createSelectCalumn<TExames>(),
      ...RetakeExameColumns()
   ]

   return (
      <>
         <DataTable
            columns={columns}
            data={exames}
            canUpdate={true}
            onUpdateMany={(ids) => {
               setSelectedIds(ids);
               open(bulkId)
            }
            }
            filterColumn="student" />;
         <SheetModal trigger={<p className="hidden">t</p>}
            side="right"
            title={`Atualizar ${selectedIds.length} exame`}
            description={`Atualizar todos os ${selectedIds.length} exames`}
            id={bulkId}
         ><BulkUpdateRetake examesIds={selectedIds} setSelectedIds={setSelectedIds} /></SheetModal>
      </>
   )
}
