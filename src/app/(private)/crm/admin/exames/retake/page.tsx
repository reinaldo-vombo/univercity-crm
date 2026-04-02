import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { RetakeExameTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Exames de Recurso'
}

export default function RetakeExamePage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Exames de Recurso"
            pageName="Exames de Recurso"
            pageUrl={`${ROUTES.DASHBOARD}/admin/exames/retake`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <RetakeExameTableServer />
            </Suspense>
         </div>
      </section>
   )
}
