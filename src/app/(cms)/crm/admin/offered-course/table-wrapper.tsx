// app/dashboard/admin/departments/table-wrapper.tsx


import { OfferdCourseTable } from "./client-table";
import { getAllDepartments, getAllOfferedCourse, getAllSemester, getAllCurses } from "@/lib/helper/db/querys";


export async function OfferedCourseTableServer() {

   const [departements, offeredCourse, semester, couses] = await Promise.all([
      getAllDepartments(),
      getAllOfferedCourse(),
      getAllSemester(),
      getAllCurses()
   ]);


   return <OfferdCourseTable
      departements={departements}
      offeredCourse={offeredCourse}
      semester={semester}
      couses={couses} />;
}
