// app/dashboard/admin/departments/table-wrapper.tsx


import { StudentTable } from "./client-table";
import { getAllCurses, getAllSemester, getAllStudent } from "@/lib/helper/db/querys";


export async function StudentTableServer() {

   const [students, courses, academicSemester] = await Promise.all([
      getAllStudent(),
      getAllCurses(),
      getAllSemester(),
   ]);

   return <StudentTable
      students={students}
      academicSemester={academicSemester}
      courses={courses} />;
}
