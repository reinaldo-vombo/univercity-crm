// app/dashboard/admin/departments/table-wrapper.tsx


import { DepartamentTable } from "./client-table";
import { getAllAcademicFaculty, getAllDepartments, getAllUsers } from "@/lib/helper/db/querys";


export async function DepartmentTableServer() {

   const [departements, users, academicFaculty] = await Promise.all([
      getAllDepartments(),
      getAllUsers(),
      getAllAcademicFaculty(),
   ]);

   const departmentsWithUserData = departements.map((dept) => {
      const user = users.find((u) => u.id === dept.departmentHeadId);
      return {
         ...dept,
         user, // attach full user object
      };
   });
   return <DepartamentTable departements={departmentsWithUserData} users={users} academicFaculty={academicFaculty} />;
}
