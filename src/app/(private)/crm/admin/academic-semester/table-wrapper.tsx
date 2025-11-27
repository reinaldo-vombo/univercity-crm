
import { getAllSemester } from "@/services/data/academic";
import { AcademicSemesterTable } from "./client-table";

export async function AcademicSemesterTableServer() {

   const semester = await getAllSemester();
   return <AcademicSemesterTable semester={semester} />;
}
