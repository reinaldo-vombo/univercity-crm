


import { getAllPrice } from "@/services/data/prices";
import { OfferedCourseSectinTable } from "./client-table";
import { getAllOfferedCourse, getAllSections } from "@/services/data/offered-course";

export async function OfferedCourseSectionTableServer() {

   const [sections, offeredCourse, prices] = await Promise.all([
      getAllSections(),
      getAllOfferedCourse(),
      getAllPrice()
   ]);
   return <OfferedCourseSectinTable
      sections={sections}
      offeredCourse={offeredCourse}
      prices={prices}
   />;
}
