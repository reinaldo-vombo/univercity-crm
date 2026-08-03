import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
} from "@/components/ui/sidebar"

import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton() {
   return (
      <Sidebar>
         <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-3">
               <Skeleton className="h-10 w-10 rounded-xl" />

               <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
               </div>
            </div>
         </SidebarHeader>

         <SidebarContent className="px-3 py-4">
            {[1, 2, 3].map((group) => (
               <SidebarGroup key={group}>
                  <Skeleton className="mb-3 h-4 w-20" />

                  <SidebarGroupContent>
                     <div className="space-y-2">
                        {[1, 2, 3, 4].map((item) => (
                           <div
                              key={item}
                              className="flex items-center gap-3 rounded-xl px-3 py-2"
                           >
                              <Skeleton className="h-5 w-5 rounded-md" />
                              <Skeleton className="h-4 flex-1" />
                           </div>
                        ))}
                     </div>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>

         <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
               <Skeleton className="h-10 w-10 rounded-full" />

               <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
               </div>
            </div>
         </SidebarFooter>
      </Sidebar>
   )
}