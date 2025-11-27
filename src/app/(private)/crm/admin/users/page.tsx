
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { UsersTableServer } from "./table-wrapper";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Útilizadores'
}

export default function UsersPages() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Útilizadores"
            pageName="Útilizadores"
            pageUrl={`${ROUTES.DASHBOARD}/admin/users`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <UsersTableServer />
            </Suspense>
         </div>
      </section>
   )
}
