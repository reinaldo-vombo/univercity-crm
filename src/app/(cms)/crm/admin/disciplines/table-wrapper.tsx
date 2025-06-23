// app/dashboard/admin/departments/table-wrapper.tsx


import { DisciplineTable } from "./client-table";
import { getAllDiscipline } from "@/lib/helper/db/querys";


export async function DisciplineTableServer() {

   const discipline = await getAllDiscipline()


   return <DisciplineTable discipline={discipline} />;
}
