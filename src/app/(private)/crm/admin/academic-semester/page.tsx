import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { AcademicSemesterTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Semestre Academico'
}
//academicDepartmentId, courseId, semesterRegistrationId
export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Semestres Acadêmico"
            pageName="admin"
            pageUrl={`${ROUTES.DASHBOARD}/admin/academic-semester`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AcademicSemesterTableServer />
            </Suspense>
         </div>
      </section>
   )
}
