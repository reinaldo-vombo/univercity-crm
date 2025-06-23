import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { DepartmentTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";


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
