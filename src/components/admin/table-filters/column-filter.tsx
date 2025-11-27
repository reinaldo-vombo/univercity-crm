"use client";

import { useState } from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

type UniversalFilterOption = {
   value: string;  // valor que será enviado para setFilterValue
   label: string;  // o que aparece no dropdown
};

type Props<TData, TValue> = {
   column: Column<TData, TValue>;
   title: string;
   options: UniversalFilterOption[];
};

export function UniversalColumnFilter<TData, TValue>({
   column,
   title,
   options,
}: Props<TData, TValue>) {
   const [filterValue, setFilterValue] = useState<string>("");

   const handleFilter = (value: string) => {
      const newValue = filterValue === value ? "" : value;
      setFilterValue(newValue);
      column.setFilterValue(newValue || undefined);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               size="sm"
               className="-ml-3 h-8 data-[state=open]:bg-accent flex items-center gap-2"
            >
               <span>{title}</span>
               <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filtrar por {title}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {options.map((option) => (
               <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilter(option.value)}
                  className={cn(
                     "cursor-pointer flex justify-between",
                     filterValue === option.value ? "bg-accent text-accent-foreground" : ""
                  )}
               >
                  {option.label}
                  {filterValue === option.value && <Check className="h-4 w-4" />}
               </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
               onClick={() => handleFilter("")}
               className="text-muted-foreground"
            >
               Limpar filtro
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}