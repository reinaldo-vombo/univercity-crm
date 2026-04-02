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
import { closeSession } from "@/actions/activitiys"

export function DropdownMenu({ children, trigger, showLogOut = false, lable, variante = 'outline', className }: DropdownMenuProps) {

   const endSession = async () => {
      signOut({ callbackUrl: '/auth/apanel/login' })
      await closeSession()
   }

   return (
      <DropdownMenuPrimitive>
         <DropdownMenuTrigger asChild>
            <Button className={className} variant={variante} aria-label="dropdown trigger button">{trigger}</Button>
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
                  <DropdownMenuItem className="flex items-center rounded-md bg-red-800 text-red-500 py-2" onClick={() => endSession()}>
                     <LogOut className="text-red-500" />
                     Sair
                  </DropdownMenuItem>
               </Fragment>
            )}
         </DropdownMenuContent>
      </DropdownMenuPrimitive>
   )
}
