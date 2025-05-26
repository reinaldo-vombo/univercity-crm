// app/dashboard/admin/departments/table-wrapper.tsx

import { serverFetch } from "@/lib/helper/api/server-fetch";
import { TDepartemant } from "@/lib/types/global";
import { DepartamentTable } from "./client-table";


export async function DepartmentTableServer() {
   const departements = await serverFetch<TDepartemant[]>('/academic-department', {
      next: { tags: ['departement'] },
   });

   return <DepartamentTable data={departements} />;
}
