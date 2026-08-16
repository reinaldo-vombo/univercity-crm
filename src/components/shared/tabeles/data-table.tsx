"use client";

import * as React from "react";
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Download, Plus } from "lucide-react";
import SheetModal from "../sheet-modal";
import Popover from "../popover";
import { DataTableToolbar } from "../../table-filters/toolbar";

type DataTableProps<TData, TValue> = {
   columns: ColumnDef<TData, TValue>[];
   data: object[];
   className?: string
   sheetClass?: string

   //toolbar
   filterColumn?: keyof TData; // e.g., "email"
   actionForm?: React.ReactNode;
   actionModal?: React.ReactElement;
   fileName?: string
   sheetId?: string;
   fileExport?: React.ReactNode;
   fileHerderes?: any
   modalTitle?: string
   // Bulk action
   onDeleteMany?: (ids: string[]) => Promise<any>;
   onUpdateMany?: (ids: number[]) => void;
   canDelete?: boolean;
   canUpdate?: boolean;
};

export function DataTable<TValue>({
   columns,
   data,
   canDelete,
   canUpdate,
   onDeleteMany,
   onUpdateMany,
   filterColumn,
   actionForm,
   fileExport,
   actionModal,
   sheetId,
   modalTitle,
   className,
   sheetClass
}: DataTableProps<any, TValue>) {

   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});

   const table = useReactTable({
      data,
      columns,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
      enableRowSelection: true,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
   });

   return (
      <div className="w-full space-y-4">
         <DataTableToolbar
            table={table}
            actionModal={actionModal}
            title="opticional"
            sheetClass={sheetClass}
            canDelete={canDelete}
            canUpdate={canUpdate}
            onDeleteMany={onDeleteMany}
            onUpdateMany={onUpdateMany}
         />
         <div className="flex items-center justify-between gap-2">
            {filterColumn && (
               <Input
                  placeholder={`Filtrar por ${String(filterColumn)}...`}
                  value={(table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ""}
                  onChange={(e) =>
                     table.getColumn(filterColumn as string)?.setFilterValue(e.target.value)
                  }
                  className="max-w-sm"
               />
            )}
            <div className="flex items-center gap-3">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4 " />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) => column.toggleVisibility(!!value)}
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        ))}
                  </DropdownMenuContent>
               </DropdownMenu>
               {actionForm && (
                  <SheetModal
                     side="right"
                     id={`create-${sheetId}`}
                     className={className}
                     trigger={<Plus />}
                     title={modalTitle || 'Sheet modal title'}
                  >
                     {actionForm}
                  </SheetModal>
               )}
               {fileExport && (
                  <Popover trigger={<Download className="h-4 w-4" />}>
                     {fileExport}
                  </Popover>
               )}
            </div>
         </div>

         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <TableHead key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(header.column.columnDef.header, header.getContext())}
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           Sem resultados.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
               {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
            <div className="space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Anterior
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Proximo
               </Button>
            </div>
         </div>
      </div>
   );
}
