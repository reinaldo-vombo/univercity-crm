

import { getAllCurses } from "@/services/data/couses";
import { FalcultyTable } from "./client-table";
import { getAllDepartments } from "@/services/data/department";
import { getAllFalculty } from "@/services/data/falculty";


export async function FalcultyTableServer() {

   const [departements, falcultys, courses] = await Promise.all([
      getAllDepartments(),
      getAllFalculty(),
      getAllCurses()
   ]);

   return <FalcultyTable
      falcultys={falcultys}
      courses={courses}
      departements={departements} />;
}
