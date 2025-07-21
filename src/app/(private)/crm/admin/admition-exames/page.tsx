import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AdmitionExameTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";


export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Exames de admisão"
            pageName="Exames de admisão"
            pageUrl={`${ROUTES.DASHBOARD}/admin/admition-exames`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AdmitionExameTableServer />
            </Suspense>
         </div>
      </section>
   )
}
