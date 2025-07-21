import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { DisciplineTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";


export default function DisciplinesPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Deciplinas"
            pageName="Deciplinas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/disciplines`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <DisciplineTableServer />
            </Suspense>
         </div>
      </section>
   )
}
