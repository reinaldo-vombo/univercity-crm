import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/sheard/nav-bar/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/helper/auth/config";
import { getServerSession } from "next-auth";

export default async function CmsLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await getServerSession(authOptions);
   const role = session?.user.role;

   if (role !== "admin" && role !== "super_admin" && role !== "student" && role !== "faculty") {
      // Optionally redirect or render fallback
      throw new Error("Invalid role or unauthenticated");
   }
   return (
      <div>
         <SidebarProvider>
            <AppSidebar role={role} />
            <main className="w-full">
               <div className="flex items-center border-border lg:border-b bg-card">
                  <SidebarTrigger className="flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 lg:border" />
                  <Header />
               </div>
               <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                  <div className="grid grid-cols-12 gap-4 md:gap-6">
                     {children}
                  </div>
               </div>
            </main>
         </SidebarProvider>
      </div>
   );
}