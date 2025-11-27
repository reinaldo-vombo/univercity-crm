import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { BuildingTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";
//diciplinas

export const metadata: Metadata = {
   title: 'Edificil'
}

export default function BuildingsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Edificios & Salas"
            pageName="Edificios & Salas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/buildings`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <BuildingTableServer />
            </Suspense>
         </div>
      </section>
   )
}
