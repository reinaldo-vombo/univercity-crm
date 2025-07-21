"use client";

import { DataTable } from "@/components/shared/data-table";
import { DisciplineColumns } from "./columns";
import CreateDisciplineForm from "@/components/forms/admin/post/create-discipline";
import { TDiscipline } from "@/types/global";


const herader = {
   id: "ID",
   name: "Nome da disciplina",
   code: "Codigo",
   minimumGradeToDismiss: "Nota",
   createdAt: "Data"
}
type TProps = {
   discipline: TDiscipline[]
}

export function DisciplineTable({ discipline }: TProps) {

   const columns = DisciplineColumns();

   return <DataTable
      actionForm={<CreateDisciplineForm />}
      columns={columns}
      fileHerderes={herader}
      modalTitle="Criar disciplina"
      fileName="disciplina"
      data={discipline}
      filterColumn="name" />;
}
