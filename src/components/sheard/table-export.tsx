"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { TExportDocProps } from "./types";


export function TableExport<T extends object>({ data, filename = "export", headers }: TExportDocProps<T>) {
   const transformRows = () => {
      return data.map((row) => {
         const transformed: Record<string, any> = {};

         for (const key in row) {
            if (Object.prototype.hasOwnProperty.call(row, key)) {
               const header = headers?.[key as keyof T] ?? key;
               transformed[header] = row[key as keyof T];
            }
         }

         return transformed;
      });
   };

   const exportToCSV = () => {
      const worksheet = XLSX.utils.json_to_sheet(transformRows());
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const blob = XLSX.write(workbook, { bookType: "csv", type: "array" });
      saveAs(new Blob([blob], { type: "text/csv" }), `${filename}.csv`);
   };

   const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(transformRows());
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const blob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([blob], { type: "application/octet-stream" }), `${filename}.xlsx`);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2">
               <Download className="h-4 w-4" />
               Export
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportToCSV}>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={exportToExcel}>Export as Excel</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
