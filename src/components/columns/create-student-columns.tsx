// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export type Student = {
   id: string
   name: string
   email: string
   major: string
}

export function StudentColumns(
   onView?: (student: Student) => void,
   onDelete?: (student: Student) => void
): ColumnDef<Student>[] {
   return [
      {
         accessorKey: "name",
         header: "Name",
      },
      {
         accessorKey: "email",
         header: "Email",
      },
      {
         accessorKey: "major",
         header: "Major",
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const student = row.original
            return (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem onClick={() => onView?.(student)}>
                        View
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => onDelete?.(student)}>
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )
         },
      },
   ]
}
