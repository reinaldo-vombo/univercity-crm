import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { CoursesTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
//diciplinas

export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Cursos"
            pageName="Cursos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/courses`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <CoursesTableServer />
            </Suspense>
         </div>
      </section>
   )
}
