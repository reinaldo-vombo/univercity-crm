// app/dashboard/admin/departments/table-wrapper.tsx


import { getAllCurses } from "@/services/data/couses";
import { DisciplineTable } from "./client-table";
import { getAllDiscipline } from "@/services/data/disciplie";
import { getAllSemester } from "@/services/data/academic";
import { getAllFalculty } from "@/services/data/falculty";
import { getAllSections } from "@/services/data/offered-course";


export async function DisciplineTableServer() {
   // const { page, limit, search } = await searchParams;
   // const discipline = await getAllDiscipline()
   const [discipline, semester, curses, faculty, offeredCourseSection] = await Promise.all([
      getAllDiscipline(),
      getAllSemester(),
      getAllCurses(),
      getAllFalculty(),
      getAllSections()
   ])


   return <DisciplineTable
      disciplines={discipline}
      semester={semester}
      curses={curses}
      faculty={faculty}
      offeredCourseSection={offeredCourseSection}
   />;
}
