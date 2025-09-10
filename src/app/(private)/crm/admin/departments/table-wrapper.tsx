
import { getAllDepartments } from "@/services/data/department";
import { DepartmentTable } from "./client-table";
import { getAllUsers } from '@/services/data/user'
import { getAllAcademicFaculty } from "@/lib/helper/db/querys";


export async function DepartmentTableServer() {

   const [departements, users, academicFaculty] = await Promise.all([
      getAllDepartments(),
      getAllUsers(),
      getAllAcademicFaculty()
   ]);


   return <DepartmentTable departements={departements} users={users} academicFacultys={academicFaculty} />;
}
