// app/dashboard/admin/departments/table-wrapper.tsx


import { FalcultyTable } from "./client-table";
import { getAllAcademicFaculty, getAllDepartments, getAllFalculty } from "@/lib/helper/db/querys";


export async function FalcultyTableServer() {

   const [departements, falcultys, academicFaculty] = await Promise.all([
      getAllDepartments(),
      getAllFalculty(),
      getAllAcademicFaculty(),
   ]);

   // const departmentsWithUserData = departements.map((dept) => {
   //    const user = users.find((u) => u.id === dept.departmentHeadId);
   //    return {
   //       ...dept,
   //       user, // attach full user object
   //    };
   // });
   return <FalcultyTable
      falcultys={falcultys}
      departements={departements}
      academicFaculty={academicFaculty} />;
}
