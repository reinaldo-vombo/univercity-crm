import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { StudentTableServer } from "./table-wrapper";

//sm:max-w-sm
export default function StudentPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Alunos"
            pageName="Alunos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/student`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <StudentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
