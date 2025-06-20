import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { OfferedCourseTableServer } from "./table-wrapper";


export default function OfferdCoursPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Deciplinas"
            pageName="Deciplinas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/departments`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<div className="text-muted-foreground">Loading table...</div>}>
               <OfferedCourseTableServer />
            </Suspense>
         </div>
      </section>
   )
}
