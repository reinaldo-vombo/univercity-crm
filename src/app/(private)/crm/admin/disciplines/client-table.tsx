"use client";

import { DataTable } from "@/components/shared/data-table";
import { DisciplineColumns } from "./columns";
import { TCourse, TDiscipline, TFaculty, TOfferedCourseSection, TSemesterRegistration } from "@/types/global";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateDisciplineForm = dynamic(() => import("@/components/forms/admin/post/create-discipline"),
   { ssr: false, loading: () => <FormLoading /> })


const herader = {
   id: "ID",
   name: "Nome da disciplina",
   code: "Codigo",
   minimumGradeToDismiss: "Nota",
   createdAt: "Data"
}
type TProps = {
   disciplines: TDiscipline[]
   semesterRegistration: TSemesterRegistration[],
   curses: TCourse[]
   faculty: TFaculty[]
   offeredCourseSection: TOfferedCourseSection[]
}
const uid = createUniqueId("create");

export function DisciplineTable({ disciplines, curses, semesterRegistration, faculty, offeredCourseSection }: TProps) {

   const columns = DisciplineColumns({ faculty, curses, semesterRegistration, disciplines, offeredCourseSection });

   return <DataTable
      actionForm={<CreateDisciplineForm curses={curses} semesterRegistration={semesterRegistration} />}
      columns={columns}
      sheetId={uid}
      className="sm:max-w-lg"
      fileHerderes={herader}
      modalTitle="Criar disciplina"
      fileName="disciplina"
      data={disciplines}
      filterColumn="name" />;
}
