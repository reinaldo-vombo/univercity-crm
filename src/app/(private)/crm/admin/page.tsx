
import { Suspense } from "react";
import { UsersTableServer } from "./users/table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { User } from "lucide-react";
import { Metadata } from "next";
import DashbordSkeleton from "@/components/skeleton/dashbord";
import DashbordWrapper from "../../../../components/admin/wrapper/dashbord-wrapper";

export const metadata: Metadata = {
   title: 'Dashboard - Painel Adiministrativo'
}

export default function AdminDashboard() {
   return (
      <div className="col-span-12">
         <Suspense fallback={<DashbordSkeleton />}>
            <DashbordWrapper />
         </Suspense>
         <div className="rounded-md bg-card p-4 mt-6">
            <div className="rounded-lg bg-background p-4">
               <div className="space-x-3 items-center flex mb-5 font-bold text-2xl">
                  <User /> <span>Todos membros</span></div>
               <Suspense fallback={<DataTableSkeleton />}>
                  <UsersTableServer />
               </Suspense>
            </div>
         </div>
      </div>
   )
}
