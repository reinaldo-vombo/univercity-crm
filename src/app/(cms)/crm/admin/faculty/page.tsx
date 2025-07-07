import Breadcrumb from "@/components/sheard/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { FalcultyTableServer } from "./table-wrapper";

//sm:max-w-sm
export default function FalcultyPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Professores"
            pageName="Professores"
            pageUrl={`${ROUTES.DASHBOARD}/admin/faculty`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <FalcultyTableServer />
            </Suspense>
         </div>
      </section>
   )
}
