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
import { signOut } from "next-auth/react"
import { Fragment } from "react"



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
               <Fragment>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center rounded-md bg-red-800" onClick={() => signOut()}>
                     <LogOut className="text-red-500" />
                     Sair
                  </DropdownMenuItem>
               </Fragment>
            )}
         </DropdownMenuContent>
      </DropdownMenuPrimitive>
   )
}
