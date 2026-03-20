import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { AcademicSemesterTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Cadeiras Semestral'
}
//academicDepartmentId, courseId, semesterRegistrationId
export default function OfferedCoursePage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Cadeiras Semestral"
            pageName="Cadeiras Semestral"
            pageUrl={`${ROUTES.DASHBOARD}/admin/offered-course`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <AcademicSemesterTableServer />
            </Suspense>
         </div>
      </section>
   )
}
