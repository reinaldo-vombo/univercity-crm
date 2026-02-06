import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import AlertModal from "../shared/alert-modal";

type TDataTableToolbarProps<T> = {
   table: Table<T>;
   onDeleteMany?: (ids: string[]) => void;
   onUpdateMany?: (ids: number[]) => void;
   canDelete?: boolean;
   canUpdate?: boolean;
}

export function DataTableToolbar<T>({
   table,
   onDeleteMany,
   onUpdateMany,
   canDelete = false,
   canUpdate = false,
}: TDataTableToolbarProps<T>) {
   const selectedRows = table.getSelectedRowModel().rows;
   const selectedIds = selectedRows.map(
      (row: any) => row.original.id
   );

   return (
      <div className="flex gap-2">
         {canUpdate && (
            <Button
               variant="outline"
               size="sm"
               aria-label="Botão de atualizar multiplos elementos"
               disabled={!selectedIds.length}
               onClick={() => onUpdateMany?.(selectedIds)}
            >
               <Pencil className="mr-2 h-4 w-4" />
               Atualizar
            </Button>
         )}

         {canDelete && (
            <AlertModal
               disabled={!selectedIds.length}
               trigger={<div aria-disabled={!selectedIds.length} className="rounded-md flex items-center gap-2 p-2 border">
                  <Trash className="h-4 w-4 text-red-500" />
                  {selectedIds.length > 0 && <b className="text-xs">({selectedIds.length})</b>}
               </div>}
               description={`Tem certeza que deseja excluir ${selectedIds.length} registros?`}
               action={() => {
                  onDeleteMany?.(selectedIds);
                  table.resetRowSelection();
               }} />
         )}


      </div>
   );
}