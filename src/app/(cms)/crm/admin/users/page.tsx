
import Breadcrumb from "@/components/sheard/breadcrumb";
import { getAllUser } from "@/lib/helper/db/querys";
import { StudentTable } from "./client-table";
import { ROUTES } from "@/constants/mock-data";

export default async function UsersPages() {
   const users = await getAllUser();
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Útilizadores"
            pageName="Útilizadores"
            pageUrl={`${ROUTES.DASHBOARD}/admin/users`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <StudentTable data={users} />
         </div>
      </section>
   )
}
