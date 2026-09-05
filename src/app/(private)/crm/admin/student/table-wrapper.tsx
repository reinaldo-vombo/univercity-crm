// import { getAllStudent } from "@/services/data/student";
import { StudentTable } from "./client-table";
import { getAllCurses } from "@/services/data/couses";
import { getAllSemester } from "@/services/data/academic";
import { getMockStudents } from "@/constants/data/student";
import MetricsCard from "@/components/layouts/cards/metrics-card";
import { CircleCheckBig, Clock3, Landmark, Users } from "lucide-react";

function countType(students: any) {
   const active = students.filter((s: any) => s.isActive === true);
   const pending = students.filter((s: any) => s.status === "INACTIVE");
   const inDep = students.filter((s: any) => s.status === "BLOCKED_FINANCIAL");
   const section = students.filter((s: any) => s.status === "PENDING_SECTION_ASSIGNMENT");
   return {
      total: students.length,
      active: active.length,
      pending: pending.length,
      inDep: inDep.length,
      section: section.length,
   };
}

export async function StudentTableServer() {

   const [students, courses, academicSemester] = await Promise.all([
      // getAllStudent(),
      getMockStudents(),
      getAllCurses(),
      getAllSemester(),
   ]);
   const studentsStatus = [
      { id: "1", icon: CircleCheckBig, title: "Ativos", total: countType(students).active || 0, },
      {
         id: "2", icon: Clock3, title: "Pendentes", total: countType(students).pending || 0,
      },
      {
         id: "3", icon: Landmark, title: "Em Depósito", total: countType(students).inDep || 0,
      },
      {
         id: "4", icon: Users, title: "Turma Pendente", total: countType(students).section || 0,
      },
   ];


   return (
      <>
         <MetricsCard data={studentsStatus} />
         <StudentTable
            students={students}
            academicSemester={academicSemester}
            courses={courses} />

      </>
   );
}
