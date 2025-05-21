
import Breadcrumb from "@/components/sheard/breadcrumb";
import { getAllUser } from "@/lib/helper/db/querys";
import { TUsers } from "@/lib/types/global";
import { StudentTable } from "./client-table";

export default async function UsersPages() {
   const users: TUsers = await getAllUser();
   return (
      <section className="col-span-12">
         <Breadcrumb />
         <div className="mt-12">
            <StudentTable data={users} />
         </div>
      </section>
   )
}
