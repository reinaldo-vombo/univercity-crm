import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { CoursesPricingTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";
//Preços dos cursos
export const metadata: Metadata = {
   title: 'Preços dos Serviços'
}

export default function PricesPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Preços dos cursos"
            pageName="Preços dos cursos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/courses-price`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <CoursesPricingTableServer />
            </Suspense>
         </div>
      </section>
   )
}
