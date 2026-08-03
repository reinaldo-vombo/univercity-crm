import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import Header from "@/components/layouts/nav-bar/Header";
import { SidebarSkeleton } from "@/components/skeleton/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default async function CrmLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   return (
      <div>
         <SidebarProvider>
            <Suspense fallback={<SidebarSkeleton />}>
               <AppSidebar />
            </Suspense>
            <main className="w-full">
               <div className="flex items-center bg-card">
                  <SidebarTrigger className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 " />
                  <Header />
               </div>
               <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                  <div className="grid grid-cols-12 gap-4 md:gap-6">
                     {children}
                  </div>
               </div>
            </main>
            {/* <SessionChecker /> */}
         </SidebarProvider>
      </div>
   );
}