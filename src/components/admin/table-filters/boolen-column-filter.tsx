"use client";

import { ArrowDown, ArrowUp, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

interface Props<TData, TValue> {
   column: Column<TData, TValue>;
   name: string;
}

export function BoolenColumnFilter<TData, TValue>({ column, name }: Props<TData, TValue>) {
   const [filterValue, setFilterValue] = useState<string>("");

   const handleFilter = (value: string) => {
      setFilterValue(value);
      if (value === "") {
         column.setFilterValue(undefined);
      } else if (value === "true") {
         column.setFilterValue(true);
      } else if (value === "false") {
         column.setFilterValue(false);
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
               <span>{name || 'somthing'}</span>
               {column.getIsSorted() === "desc" ? (
                  <ArrowDown className="ml-2 h-4 w-4" />
               ) : column.getIsSorted() === "asc" ? (
                  <ArrowUp className="ml-2 h-4 w-4" />
               ) : (
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
               <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
               <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("")}>
               {filterValue === "" && <Check className="mr-2 h-4 w-4 text-primary" />} Show All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("true")}>
               {filterValue === "true" && <Check className="mr-2 h-4 w-4 text-primary" />} Show True
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("false")}>
               {filterValue === "false" && <Check className="mr-2 h-4 w-4 text-primary" />} Show False
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
