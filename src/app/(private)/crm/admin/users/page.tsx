
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
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

         <div className="mt-9 space-y-2">
            <h1 className="text-3xl font-bold">Gerenciador de Útilizadores</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ut quidem at odio saepe deserunt corrupti magni inventore aspernatur eveniet? Iusto architecto incidunt dignissimos inventore, suscipit corrupti eaque quis rem.</p>
         </div>

         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <UsersTableServer />
            </Suspense>
         </div>
      </section>
   )
}
