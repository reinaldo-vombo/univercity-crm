
import { getAllAcademicFaculty } from "@/services/data/academic";
import { AcademicFacultyTable } from "./client-table";

export async function CurseTableServer() {
   const acdemicFaculty = await getAllAcademicFaculty();

   return <AcademicFacultyTable data={acdemicFaculty} />;
}
