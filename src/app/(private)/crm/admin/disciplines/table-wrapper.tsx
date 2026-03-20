// app/dashboard/admin/departments/table-wrapper.tsx


import { getAllCurses } from "@/services/data/couses";
import { DisciplineTable } from "./client-table";
import { getAllDiscipline } from "@/services/data/disciplie";
import { getAllSemesterRegistration } from "@/services/data/academic";
import { getAllFalculty } from "@/services/data/falculty";
import { getAllSections } from "@/services/data/offered-course";


export async function DisciplineTableServer() {
   // const { page, limit, search } = await searchParams;
   // const discipline = await getAllDiscipline()
   const [discipline, semesterRegistration, curses, faculty, offeredCourseSection] = await Promise.all([
      getAllDiscipline(),
      getAllSemesterRegistration(),
      getAllCurses(),
      getAllFalculty(),
      getAllSections()
   ])


   return <DisciplineTable
      disciplines={discipline}
      semesterRegistration={semesterRegistration}
      curses={curses}
      faculty={faculty}
      offeredCourseSection={offeredCourseSection}
   />;
}
