


import { OfferedCourseSectinTable } from "./client-table";
import { getAllOfferedCourse, getAllSections } from "@/services/data/offered-course";

export async function OfferedCourseSectionTableServer() {

   const [sections, offeredCourse] = await Promise.all([
      getAllSections(),
      getAllOfferedCourse(),
   ]);
   return <OfferedCourseSectinTable
      sections={sections}
      offeredCourse={offeredCourse}
   />;
}
