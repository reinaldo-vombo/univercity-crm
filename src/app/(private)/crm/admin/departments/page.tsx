import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { DepartmentTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Departamentos Academicos'
}

export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Departamentos"
            pageName="Departamentos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/departments`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <DepartmentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
