
import { getAllAcademicFaculty } from "@/services/data/academic";
import { AcademicFacultyTable } from "./client-table";
import { getAllPrice } from "@/services/data/prices";

export async function CurseTableServer() {
   const [acdemicFaculty, prices] = await Promise.all([
      getAllAcademicFaculty(),
      getAllPrice()
   ])

   return <AcademicFacultyTable data={acdemicFaculty} prices={prices} />;
}
