
import { getAllAcademicFaculty } from "@/lib/helper/db/querys";
import { CursesTable } from "./client-table";

export async function CurseTableServer() {
   const acdemicFaculty = await getAllAcademicFaculty();

   return <CursesTable data={acdemicFaculty} />;
}
