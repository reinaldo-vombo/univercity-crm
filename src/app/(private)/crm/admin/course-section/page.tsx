import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { OfferedCourseSectionTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Turmas'
}
//academicDepartmentId, courseId, semesterRegistrationId
export default function OfferedCourseSectionPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Turmas"
            pageName="Turmas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/offered-course-section`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <OfferedCourseSectionTableServer />
            </Suspense>
         </div>
      </section>
   )
}
