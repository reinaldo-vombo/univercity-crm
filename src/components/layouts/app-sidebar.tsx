'use client'
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarHeader,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LINKS_BY_ROLE, SECTION_LABELS } from "@/constants/nav-links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { User } from "@/lib/helper/auth/user";

type TRoles = "super_admin" | "admin"

export function AppSidebar() {
   const user: any = User();
   const role: TRoles = user && user.role
   const pathname = usePathname();
   if (!user) {
      return <p>Loading</p>
   }


   const links = LINKS_BY_ROLE[role];
   const groupedLinks = links.reduce((acc, item) => {
      const section = item.section || 'general';

      if (!acc[section]) {
         acc[section] = [];
      }

      acc[section].push(item);

      return acc;
   }, {} as Record<string, typeof links>);

   // const orderedSections = SECTION_ORDER.filter(
   //    (section) => groupedLinks[section]
   // );

   return (
      <Sidebar>
         <SidebarHeader>
            <Image
               className="dark:invert"
               src="/SIGU.png"
               alt="Enrollix logo"
               width={70}
               height={70}
               priority
            />
         </SidebarHeader>

         <SidebarContent>
            {Object.entries(groupedLinks).map(([section, items]) => (
               <SidebarGroup key={section}>
                  <SidebarGroupLabel className="mb-4">
                     {SECTION_LABELS[section]}
                  </SidebarGroupLabel>

                  <SidebarGroupContent>
                     <SidebarMenu>
                        {items.map((item) => {
                           const hasChildren = item.children?.length;
                           if (!hasChildren) {
                              return (
                                 <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                       asChild
                                       isActive={pathname === item.href}
                                    >
                                       <Link href={item.href}>
                                          {item.icon}
                                          <span>{item.label}</span>
                                       </Link>
                                    </SidebarMenuButton>
                                 </SidebarMenuItem>
                              );
                           }

                           return (
                              <SidebarMenuItem key={item.label}>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <SidebarMenuButton>
                                          {item.label}
                                          <ChevronDown className="ml-auto" />
                                       </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                       {item.children.map((route) => (
                                          <DropdownMenuItem key={route.label}>
                                             <Link href={route.href}>{route.label}</Link>
                                          </DropdownMenuItem>
                                       ))}
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </SidebarMenuItem>
                           );
                        })}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>
      </Sidebar>
   )
}
