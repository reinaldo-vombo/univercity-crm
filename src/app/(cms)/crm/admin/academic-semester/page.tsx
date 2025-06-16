import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AcademicSemesterTableServer } from "./table-wrapper";

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
            <Suspense fallback={<div className="text-muted-foreground">Loading table...</div>}>
               <AcademicSemesterTableServer />
            </Suspense>
         </div>
      </section>
   )
}
