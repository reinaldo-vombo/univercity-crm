import ActivityLogsDetails from "@/components/admin/activity-logs-details";
import { SectionCards } from "@/components/admin/container/section-card";
import ChartWrapper from "@/components/admin/wrapper/chart-wrapper";
import { Suspense } from "react";
import { UsersTableServer } from "./users/table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ChartBar, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Dashboard'
}

export default function AdminDashboard() {
   return (
      <div className="col-span-12">
         <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <SectionCards />
            </div>
         </div>
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
               <div className="rounded-lg bg-card space-y-5 p-4">
                  <div className="flex items-center justify-between">
                     <div className="space-x-3 flex font-bold text-2xl">
                        <ChartBar /> <span>Pagamentos mensal</span>
                     </div>
                     <Button className="flex items-center gap-2">
                        <Download />
                        Export
                     </Button>
                  </div>
                  <ChartWrapper />
               </div>
            </div>
            <div className="col-span-4">
               <ActivityLogsDetails />
            </div>
         </div>
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
