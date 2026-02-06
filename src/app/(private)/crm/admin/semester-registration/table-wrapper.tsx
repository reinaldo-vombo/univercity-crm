
import { getAllSemester, getAllSemesterRegistration } from "@/services/data/academic";
import { AcademicSemesterRegistrationTable } from "./client-table";

export async function AcademicSemesterTableServer() {

   const [semesterRegistration, academicSemester] = await Promise.all([
      getAllSemesterRegistration(),
      getAllSemester()
   ]);
   return <AcademicSemesterRegistrationTable
      academicSemester={academicSemester}
      semesterRegistration={semesterRegistration}
   />;
}
