import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AcademicSemesterTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";

//academicDepartmentId, courseId, semesterRegistrationId
export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Semestres"
            pageName="Semestres"
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
