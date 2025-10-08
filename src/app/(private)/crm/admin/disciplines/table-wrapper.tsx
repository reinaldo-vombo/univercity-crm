// app/dashboard/admin/departments/table-wrapper.tsx


import { getAllCurses } from "@/services/data/couses";
import { DisciplineTable } from "./client-table";
import { getAllDiscipline } from "@/services/data/disciplie";
import { getAllSemester } from "@/services/data/academic";
import { TSeachParams } from "@/types/global";


export async function DisciplineTableServer({ searchParams }: TSeachParams) {
   const { page, limit, search } = await searchParams;
   // const discipline = await getAllDiscipline()
   const [discipline, semester, curses] = await Promise.all([
      getAllDiscipline({
         page: Number(page) || 1,
         limit: Number(limit) || 10,
         search: search || "",
      }),
      getAllSemester(),
      getAllCurses()
   ])


   return <DisciplineTable discipline={discipline} semester={semester} curses={curses} />;
}
