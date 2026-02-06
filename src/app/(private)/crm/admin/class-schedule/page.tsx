import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { OfferedCourseSectionTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Horários'
}
//academicDepartmentId, courseId, semesterRegistrationId
export default function OfferedCourseClassShedulePage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Horarios"
            pageName="Horarios"
            pageUrl={`${ROUTES.DASHBOARD}/admin/class-schedule`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <OfferedCourseSectionTableServer />
            </Suspense>
         </div>
      </section>
   )
}
