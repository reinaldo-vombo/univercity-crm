
import Breadcrumb from "@/components/sheard/breadcrumb";
import { StudentTable } from "./client-table";
import { ROUTES } from "@/constants/mock-data";
import { serverFetch } from "@/lib/helper/api/server-fetch";
import { TUser } from "@/lib/types/global";

export default async function UsersPages() {
   const users = await serverFetch<TUser[]>('/users', {
      next: { tags: ['users'] }, // 🚀 tags for smart revalidation
   });
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
