
import { FalcultyTable } from "./client-table";
import { getAllAcademicFaculty } from "@/lib/helper/db/querys";
import { getAllDepartments } from "@/services/data/department";
import { getAllFalculty } from "@/services/data/falculty";


export async function FalcultyTableServer() {

   const [departements, falcultys, academicFaculty] = await Promise.all([
      getAllDepartments(),
      getAllFalculty(),
      getAllAcademicFaculty(),
   ]);

   return <FalcultyTable
      falcultys={falcultys}
      departements={departements}
      academicFaculty={academicFaculty} />;
}
