import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { AuditTableServer } from "./table-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Registro de Actividades'
}

export default async function AuditLogsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Registro de Actividadess"
            pageName="Admin"
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
