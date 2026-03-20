


import { OfferedCourseSectinTable } from "./client-table";
import { getAllSections, getAllOfferedCourseClassShedule } from "@/services/data/offered-course";
import { getAllRoom, getAllSemesterRegistration } from "@/services/data/academic";
import { getAllDiscipline } from "@/services/data/disciplie";

export async function OfferedCourseSectionTableServer() {

   const [classSchedule, sections, semesterRegistaration, disciplines, rooms] = await Promise.all([
      getAllOfferedCourseClassShedule(),
      getAllSections(),
      getAllSemesterRegistration(),
      getAllDiscipline(),
      getAllRoom()
   ]);
   return <OfferedCourseSectinTable
      schedules={classSchedule}
      sections={sections}
      rooms={rooms}
      disciplines={disciplines}
      semesterRegistrations={semesterRegistaration}
   />;
}
