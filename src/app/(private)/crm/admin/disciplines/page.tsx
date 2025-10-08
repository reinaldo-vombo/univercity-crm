import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { DisciplineTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { TSeachParams } from "@/types/global";

export default function DisciplinesPage({ searchParams }: TSeachParams) {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Deciplinas"
            pageName="Deciplinas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/disciplines`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <DisciplineTableServer searchParams={searchParams} />
            </Suspense>
         </div>
      </section>
   )
}
