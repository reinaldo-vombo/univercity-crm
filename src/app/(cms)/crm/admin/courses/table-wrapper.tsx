
import { CoursesTable } from "./client-table";
import { getAllCurses } from "@/lib/helper/db/querys";


export async function CoursesTableServer() {

   const courses = await getAllCurses()

   return <CoursesTable couses={courses} />;
}
