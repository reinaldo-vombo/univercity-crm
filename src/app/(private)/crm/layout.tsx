import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import Header from "@/components/layouts/nav-bar/Header";
import { SidebarSkeleton } from "@/components/skeleton/side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
               <div className="flex items-center">
                  <Header />
               </div>
               <div className="mx-auto max-w-(--breakpoint-2xl) mt-6">
                  <div className="grid grid-cols-12 gap-4 md:gap-6 mx-6">
                     {children}
                  </div>
               </div>
            </main>
            {/* <SessionChecker /> */}
         </SidebarProvider>
      </div>
   );
}