"use client";

import { DataTable } from "@/components/shared/data-table";
import { DisciplineColumns } from "./columns";
import CreateDisciplineForm from "@/components/forms/admin/post/create-discipline";
import { TCourse, TDiscipline, TFaculty, TSemester } from "@/types/global";
import { createUniqueId } from "@/lib/helper";


const herader = {
   id: "ID",
   name: "Nome da disciplina",
   code: "Codigo",
   minimumGradeToDismiss: "Nota",
   createdAt: "Data"
}
type TProps = {
   discipline: TDiscipline[]
   semester: TSemester[],
   curses: TCourse[]
   faculty: TFaculty[]
}
const uid = createUniqueId("create");

export function DisciplineTable({ discipline, curses, semester, faculty }: TProps) {

   const columns = DisciplineColumns(faculty);

   return <DataTable
      actionForm={<CreateDisciplineForm curses={curses} semesters={semester} />}
      columns={columns}
      sheetId={uid}
      fileHerderes={herader}
      modalTitle="Criar disciplina"
      fileName="disciplina"
      data={discipline}
      filterColumn="name" />;
}
