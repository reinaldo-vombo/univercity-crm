"use client";

import { ArrowDown, ArrowUp, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

interface Props<TData, TValue> {
   column: Column<TData, TValue>;
}

export function FaseColumnFilter<TData, TValue>({ column }: Props<TData, TValue>) {
   const [filterValue, setFilterValue] = useState<string>("");

   // adjust based on the distinct Fase numbers you have
   const faseValues = [1, 2, 3, 4, 5];

   const handleFilter = (value: string) => {
      setFilterValue(value);
      if (value === "") {
         column.setFilterValue(undefined);
      } else {
         column.setFilterValue(Number(value));
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
               <span>Fase</span>
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleFilter("")}>
               {filterValue === "" && <Check className="mr-2 h-4 w-4 text-primary" />} Show All
            </DropdownMenuItem>
            {faseValues.map((fase) => (
               <DropdownMenuItem key={fase} onClick={() => handleFilter(String(fase))}>
                  {filterValue === String(fase) && <Check className="mr-2 h-4 w-4 text-primary" />}
                  {`Fase ${fase}`}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
