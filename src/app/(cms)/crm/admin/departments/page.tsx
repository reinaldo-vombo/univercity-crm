import Breadcrumb from "@/components/sheard/breadcrumb";
import { ROUTES } from "@/constants/mock-data";


export default function DepartmentsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Departamentos"
            pageName="Departamentos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/departments`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            {/* <StudentTable data={users} /> */}
         </div>
      </section>
   )
}
