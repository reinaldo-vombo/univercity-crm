

import { getAllCurses } from "@/services/data/couses";
import { CoursesTable } from "./client-table";
import { getAllDepartments } from "@/services/data/department";
import { getAllFalculty } from "@/services/data/falculty";


export async function CoursesTableServer() {

   const [departements, courses, falculty] = await Promise.all([
      getAllDepartments(),
      getAllCurses(),
      getAllFalculty()
   ]);


   return <CoursesTable couses={courses} departements={departements} falculty={falculty} />;
}
