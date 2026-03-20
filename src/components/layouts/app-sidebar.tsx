'use client'
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LINKS_BY_ROLE } from "@/constants/nav-links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TRoles = {
   role: "super_admin" | "admin" | "manager"
}
export function AppSidebar({ role }: TRoles) {

   const pathname = usePathname();

   const links = LINKS_BY_ROLE[role];
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel className="mb-4">
                  <Image
                     className="dark:invert"
                     src="/logo.svg"
                     alt="Enrollix logo"
                     width={70}
                     height={70}
                     priority
                  />
               </SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {links.map((item) => (
                        <SidebarMenuItem key={item.label}>
                           <SidebarMenuButton asChild isActive={pathname === item.href}>
                              <Link href={item.href}>
                                 {item.icon}
                                 <span>{item.label}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   )
}
