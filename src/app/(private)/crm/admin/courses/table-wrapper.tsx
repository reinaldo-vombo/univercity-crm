
import { getAllFalculty } from "../../../../../lib/helper/db/querys";
import { CoursesTable } from "./client-table";
import { getAllCurses, getAllDepartments } from "@/lib/helper/db/querys";


export async function CoursesTableServer() {

   const [departements, courses, falculty] = await Promise.all([
      getAllDepartments(),
      getAllCurses(),
      getAllFalculty()
   ]);


   return <CoursesTable couses={courses} departements={departements} falculty={falculty} />;
}
