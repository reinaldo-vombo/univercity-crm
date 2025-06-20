
import { CoursesTable } from "./client-table";
import { getAllCurses, getAllDepartments } from "@/lib/helper/db/querys";


export async function CoursesTableServer() {

   const [departements, courses] = await Promise.all([
      getAllDepartments(),
      getAllCurses(),
   ]);


   return <CoursesTable couses={courses} departements={departements} />;
}
