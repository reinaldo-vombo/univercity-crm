
import { CoursesPriceTable } from "./client-table";
import { getAllCoursePrice, getAllCurses } from "@/lib/helper/db/querys";


export async function CoursesPricingTableServer() {

   const [coursePrices, courses] = await Promise.all([
      getAllCoursePrice(),
      getAllCurses(),
   ]);


   return <CoursesPriceTable couses={courses} coursePrices={coursePrices} />;
}
