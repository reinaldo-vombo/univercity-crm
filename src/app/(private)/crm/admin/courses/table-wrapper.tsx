

import { getAllCurses } from "@/services/data/couses";
import { CoursesTable } from "./client-table";
import { getAllDepartments } from "@/services/data/department";
import { getAllFalculty } from "@/services/data/falculty";
import { getAllPrice } from "@/services/data/prices";

export async function CoursesTableServer() {

   const [departements, courses, falculty, prices] = await Promise.all([
      getAllDepartments(),
      getAllCurses(),
      getAllFalculty(),
      getAllPrice()
   ]);


   return <CoursesTable
      couses={courses}
      departements={departements}
      falculty={falculty}
      prices={prices} />;
}
