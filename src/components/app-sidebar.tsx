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
import { DUMMY_DATA } from "@/constants/mock-data";
import Link from "next/link";

type SidebarProps = {
   role: "super_admin" | "admin" | "student" | "faculty";
};
export function AppSidebar({ role }: SidebarProps) {

   const links = DUMMY_DATA.linksByRole[role ?? "student"];
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {links.map((item) => (
                        <SidebarMenuItem key={item.label}>
                           <SidebarMenuButton asChild>
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
