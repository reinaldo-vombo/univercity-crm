import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { AcademicSemesterTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Registro Semestre Academíco'
}
export default function SemesterRegistrationPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Registro Semestre Academíco"
            pageName="Registro Semestre Academíco"
            pageUrl={`${ROUTES.DASHBOARD}/admin/semester-registration`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AcademicSemesterTableServer />
            </Suspense>
         </div>
      </section>
   )
}
