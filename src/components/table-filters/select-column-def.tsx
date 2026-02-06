import { ColumnDef } from "@tanstack/react-table";
import { SelectCell, SelectHeader } from "./select-columns";

export function createSelectCalumn<T>(): ColumnDef<T> {
   return {
      id: "select",
      header: ({ table }) => <SelectHeader table={table} />,
      cell: ({ row }) => <SelectCell row={row} />,
      enableSorting: false,
      enableHiding: false
   }
}