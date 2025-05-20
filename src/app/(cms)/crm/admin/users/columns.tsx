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

export type Users = {
   id: string
   name: string
   email: string
   role: string
}

export function UsersColumns(
   onView?: (student: Users) => void,
   onDelete?: (student: Users) => void
): ColumnDef<Users>[] {
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
         accessorKey: "role",
         header: "Cargo",
      },
      {
         id: "actions",
         cell: ({ row }) => {
            const users = row.original
            return (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem onClick={() => onView?.(users)}>
                        View
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => onDelete?.(users)}>
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )
         },
      },
   ]
}
