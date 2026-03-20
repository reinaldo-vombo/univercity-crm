// import { getAllStudent } from "@/services/data/student";
import { StudentTable } from "./client-table";
import { getAllCurses } from "@/services/data/couses";
import { getAllSemester } from "@/services/data/academic";
import { getMockStudents } from "@/constants/data/student";


export async function StudentTableServer() {

   const [students, courses, academicSemester] = await Promise.all([
      // getAllStudent(),
      getMockStudents(),
      getAllCurses(),
      getAllSemester(),
   ]);

   return <StudentTable
      students={students}
      academicSemester={academicSemester}
      courses={courses} />;
}
