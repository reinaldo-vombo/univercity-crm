
import { AcademicSemesterTable } from "./client-table";
import { getAllSemester } from "@/lib/helper/db/querys";

export async function AcademicSemesterTableServer() {

   const semester = await getAllSemester();
   return <AcademicSemesterTable semester={semester} />;
}
