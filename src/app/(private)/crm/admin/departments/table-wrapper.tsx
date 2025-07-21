
import { DepartmentTable } from "./client-table";
import { getAllAcademicFaculty, getAllDepartments, getAllUsers } from "@/lib/helper/db/querys";


export async function DepartmentTableServer() {

   const [departements, users, academicFaculty] = await Promise.all([
      getAllDepartments(),
      getAllUsers(),
      getAllAcademicFaculty()
   ]);


   return <DepartmentTable departements={departements} users={users} academicFacultys={academicFaculty} />;
}
