// app/dashboard/admin/departments/table-wrapper.tsx


import { getAllStudent } from "@/services/data/student";
import { StudentTable } from "./client-table";
import { getAllSemester } from "@/lib/helper/db/querys";
import { getAllCurses } from "@/services/data/couses";


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
