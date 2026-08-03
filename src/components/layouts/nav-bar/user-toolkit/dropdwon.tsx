"use client";

import Avatar from "@/components/shared/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TUser } from "@/types/global";
import { ReactElement } from "react";
import { itemClass, LOGOUT_ITEM, PROFILE_ITEMS, SETTINGS_ITEMS } from "./constants";
import { signOut } from "next-auth/react";
import { closeSession } from "@/actions/activitiys";
import Link from "next/link";

type Props = {
   trigger: ReactElement;
   defaultOpen?: boolean;
   align?: "start" | "center" | "end";
   user: TUser
};

const endSession = async () => {
   signOut({ callbackUrl: '/auth/apanel/login' })
   await closeSession()
}

export const Dropdown = ({ trigger, defaultOpen, align = "end", user }: Props) => {
   return (
      <div className="flex items-start justify-center">
         <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger className="cursor-pointer">
               {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent
               align={align}
               className="w-3xs rounded-2xl data-open:slide-in-from-bottom-20! data-closed:slide-out-to-bottom-20 data-open:fade-in-0 data-closed:fade-out-0 data-closed:zoom-out-100 duration-400"
            >
               <DropdownMenuGroup>
                  {/* User Info */}
                  <DropdownMenuLabel className="flex items-center gap-3 px-4 py-3">
                     <div className="relative">
                        <Avatar name={user.avatar} className="size-10" />
                        <span className="ring-card absolute right-0 bottom-0 size-2 rounded-full bg-green-600 ring-2" />
                     </div>

                     <div className="flex flex-col">
                        <span className="text-popover-foreground text-sm font-medium">
                           {user.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                           {user.email}
                        </span>
                     </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* Main Links */}
                  {PROFILE_ITEMS.map(({ label, icon: Icon, route }) => (
                     <DropdownMenuItem key={label} className={itemClass}>
                        <Icon size={20} />
                        <Link href={route}>{label}</Link>
                     </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />

                  {/* Settings */}
                  <DropdownMenuGroup>
                     {SETTINGS_ITEMS.map(({ label, icon: Icon, route }) => (
                        <DropdownMenuItem key={label} className={itemClass}>
                           <Icon size={20} />
                           <Link href={route}>{label}</Link>
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem variant="destructive" className={itemClass} onClick={() => endSession()}>
                     <LOGOUT_ITEM.icon size={20} />
                     <span>{LOGOUT_ITEM.label}</span>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};