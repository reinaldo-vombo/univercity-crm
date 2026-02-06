

import { getAllCurses } from "@/services/data/couses";
import { OfferedCourseTable } from "./client-table";
import { getAllOfferedCourse } from "@/services/data/offered-course";
import { getAllDepartments } from "@/services/data/department";
import { getAllDiscipline } from "@/services/data/disciplie";
import { getAllSemesterRegistration } from "@/services/data/academic";

export async function AcademicSemesterTableServer() {

   const [offeredCourse, courses, departments, disciplines, semesterRegistaration] = await Promise.all([
      getAllOfferedCourse(),
      getAllCurses(),
      getAllDepartments(),
      getAllDiscipline(),
      getAllSemesterRegistration(),
   ]);
   return <OfferedCourseTable
      offeredCourse={offeredCourse}
      course={courses}
      departments={departments}
      disciplines={disciplines}
      semesterRegistration={semesterRegistaration}
   />;
}
