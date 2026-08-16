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
   useSidebar,
   SidebarMenuSub,
   SidebarMenuSubItem,
   SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@/lib/helper/auth/user";
import { ROUTES_BY_ROLE, SECTION_LABELS } from "./constants";
import { cloneElement, isValidElement } from "react";
import { ChevronRight } from "lucide-react";

type TRoles = "SUPER_ADMIN" | "ADMIN"

function NavIcon({ icon }: { icon: React.ReactNode }) {
   if (!isValidElement(icon)) return null
   return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
         {cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: 'h-4 w-4',
         })}
      </span>
   )
}

export function AppSidebar() {
   const user: any = User()
   const role: TRoles = user && user.role
   const pathname = usePathname()
   const { state, isMobile } = useSidebar()
   const isCollapsed = state === 'collapsed' && !isMobile

   const links = ROUTES_BY_ROLE[role || 'ADMIN']

   const groupedLinks = links.reduce((acc, item) => {
      const section = item.section || 'general'
      if (!acc[section]) acc[section] = []
      acc[section].push(item)
      return acc
   }, {} as Record<string, typeof links>)

   const hasChildren = (item: (typeof links)[number]) =>
      !!item.children && item.children.length > 0

   const isChildActive = (item: (typeof links)[number]) =>
      hasChildren(item) && item.children!.some((c) => pathname === c.href)

   return (
      <Sidebar collapsible="icon" className="bg-mone">
         <SidebarHeader className="flex flex-row items-center gap-2 overflow-hidden">
            <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:justify-center">
               <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent/50">
                  <Image
                     className="dark:invert"
                     src="/SIGU.png"
                     alt="Enrollix logo"
                     width={50}
                     height={50}
                     priority
                  />
               </div>

               <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                  <b className="truncate text-sm leading-tight text-sidebar-foreground">
                     SIUG
                  </b>
                  <span className="truncate text-sidebar-foreground/60">
                     Painel de Gestão
                  </span>
               </div>
            </div>
         </SidebarHeader>

         <SidebarContent className="no-scrollbar overflow-y-auto">
            {Object.entries(groupedLinks).map(([section, items]) => (
               <SidebarGroup key={section}>
                  <SidebarGroupLabel className="mb-2">
                     {SECTION_LABELS[section]}
                  </SidebarGroupLabel>

                  <SidebarGroupContent>
                     <SidebarMenu>
                        {items.map((item) => {
                           const active =
                              pathname === item.href || isChildActive(item)

                           // --- item simples, sem filhos ---
                           if (!hasChildren(item)) {
                              return (
                                 <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                       asChild
                                       isActive={active}
                                       tooltip={item.label}
                                    >
                                       <Link href={item.href}>
                                          <NavIcon icon={item.icon} />
                                          <span className="truncate">
                                             {item.label}
                                          </span>
                                       </Link>
                                    </SidebarMenuButton>
                                 </SidebarMenuItem>
                              )
                           }

                           // --- com filhos + sidebar colapsada -> dropdown flyout ---
                           if (isCollapsed) {
                              return (
                                 <SidebarMenuItem key={item.label}>
                                    <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                          <SidebarMenuButton
                                             isActive={active}
                                             tooltip={item.label}
                                          >
                                             <NavIcon icon={item.icon} />
                                             <span className="truncate">
                                                {item.label}
                                             </span>
                                          </SidebarMenuButton>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent
                                          side="right"
                                          align="start"
                                          className="min-w-48"
                                       >
                                          {item.children!.map((child) => (
                                             <DropdownMenuItem
                                                key={child.href}
                                                asChild
                                             >
                                                <Link href={child.href}>
                                                   {child.label}
                                                </Link>
                                             </DropdownMenuItem>
                                          ))}
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </SidebarMenuItem>
                              )
                           }

                           // --- com filhos + sidebar expandida -> collapsible ---
                           return (
                              <Collapsible
                                 key={item.label}
                                 asChild
                                 defaultOpen={active}
                                 className="group/collapsible"
                              >
                                 <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                       <SidebarMenuButton
                                          isActive={active}
                                          tooltip={item.label}
                                       >
                                          <NavIcon icon={item.icon} />
                                          <span className="truncate">
                                             {item.label}
                                          </span>
                                          <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                       </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                       <SidebarMenuSub>
                                          {item.children!.map((child) => (
                                             <SidebarMenuSubItem
                                                key={child.href}
                                             >
                                                <SidebarMenuSubButton
                                                   asChild
                                                   isActive={
                                                      pathname === child.href
                                                   }
                                                >
                                                   <Link href={child.href}>
                                                      <span className="truncate">
                                                         {child.label}
                                                      </span>
                                                   </Link>
                                                </SidebarMenuSubButton>
                                             </SidebarMenuSubItem>
                                          ))}
                                       </SidebarMenuSub>
                                    </CollapsibleContent>
                                 </SidebarMenuItem>
                              </Collapsible>
                           )
                        })}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>
      </Sidebar>
   )
}
