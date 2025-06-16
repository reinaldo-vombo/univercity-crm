import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import { AdmitionExameTableServer } from "./table-wrapper";


export default function DepartmentsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Exames de admisão"
            pageName="Exames de admisão"
            pageUrl={`${ROUTES.DASHBOARD}/admin/admition-exames`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<div className="text-muted-foreground">Loading table...</div>}>
               <AdmitionExameTableServer />
            </Suspense>
         </div>
      </section>
   )
}
