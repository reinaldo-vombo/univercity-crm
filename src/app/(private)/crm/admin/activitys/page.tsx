import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AuditTableServer } from "./table-wrapper";
import { TSeachParams } from "@/types/global";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Actividades'
}

export default async function AuditLogsPage({ searchParams }: TSeachParams) {
   const { take } = await searchParams;
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Actividades"
            pageName="Actividades"
            pageUrl={`${ROUTES.DASHBOARD}/admin/activitys`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AuditTableServer searchOptions={take} />
            </Suspense>
         </div>
      </section>
   )
}
