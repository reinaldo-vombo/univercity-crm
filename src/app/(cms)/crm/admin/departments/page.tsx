import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { DepartmentTableServer } from "./table-wrapper";


export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Departamentos"
            pageName="Departamentos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/departments`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<div className="text-muted-foreground">Loading table...</div>}>
               <DepartmentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
