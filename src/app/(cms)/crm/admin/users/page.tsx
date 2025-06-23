
import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { UsersTableServer } from "./table-wrapper";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/data-table";

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
