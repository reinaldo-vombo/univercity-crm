"use client"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu as DropdownMenuPrimitive,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuItem,

} from "@/components/ui/dropdown-menu"
import { DropdownMenuProps } from "./types"
import { LogOut } from "lucide-react"



export function DropdownMenu({ children, trigger, showLogOut = false, lable, variante = 'outline', className }: DropdownMenuProps) {

   return (
      <DropdownMenuPrimitive>
         <DropdownMenuTrigger asChild>
            <Button className={className} variant={variante}>{trigger}</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="font-bold">{lable}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup >
               {children}
            </DropdownMenuRadioGroup>
            {showLogOut && (
               <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center">
                     <LogOut />
                     Sair
                  </DropdownMenuItem>
               </>
            )}
         </DropdownMenuContent>
      </DropdownMenuPrimitive>
   )
}
