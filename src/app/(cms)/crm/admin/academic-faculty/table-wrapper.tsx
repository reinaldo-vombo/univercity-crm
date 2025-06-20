
import { getAllAcademicFaculty } from "@/lib/helper/db/querys";
import { AcademicFacultyTable } from "./client-table";

export async function CurseTableServer() {
   const acdemicFaculty = await getAllAcademicFaculty();

   return <AcademicFacultyTable data={acdemicFaculty} />;
}
