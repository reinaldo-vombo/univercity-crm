import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AuditTableServer } from "./table-wrapper";


export default function AuditLogsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Actividades"
            pageName="Actividades"
            pageUrl={`${ROUTES.DASHBOARD}/admin/activitys`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AuditTableServer />
            </Suspense>
         </div>
      </section>
   )
}
