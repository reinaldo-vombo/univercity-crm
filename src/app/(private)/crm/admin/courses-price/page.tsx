import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { CoursesPricingTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
//Preços dos cursos

export default function DepartmentsPage() {

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
