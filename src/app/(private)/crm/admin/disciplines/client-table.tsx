"use client";

import { DataTable } from "@/components/shared/data-table";
import { DisciplineColumns } from "./columns";
import CreateDisciplineForm from "@/components/forms/admin/post/create-discipline";
import { TCourse, TDiscipline, TSemester } from "@/types/global";


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
}

export function DisciplineTable({ discipline, curses, semester }: TProps) {

   const columns = DisciplineColumns();

   return <DataTable
      actionForm={<CreateDisciplineForm curses={curses} semesters={semester} />}
      columns={columns}
      fileHerderes={herader}
      modalTitle="Criar disciplina"
      fileName="disciplina"
      data={discipline}
      filterColumn="name" />;
}
