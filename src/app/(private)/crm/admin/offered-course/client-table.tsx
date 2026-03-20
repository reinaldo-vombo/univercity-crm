"use client";

import { DataTable } from "@/components/shared/data-table";
import { TCourse, TDepartemant, TDiscipline, TOfferedCourse, TSemesterRegistration } from "@/types/global";
import { OfferedCourseColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateOfferedCourseForm = dynamic(() => import("@/components/forms/admin/post/auto-generate-offered"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   offeredCourse: TOfferedCourse[];
   course: TCourse[];
   departments: TDepartemant[];
   disciplines: TDiscipline[];
   semesterRegistration: TSemesterRegistration[]
}
const herader = {
   id: "ID",
   title: "Full Name",
   code: "Codigo",
   year: "Ano Corrente",
   startMonth: "Mês inicial",
   endMonth: "Mês de encerramento"
}
const uid = createUniqueId("create");
export function OfferedCourseTable({ offeredCourse, course, departments, disciplines, semesterRegistration }: Props) {

   const columns = OfferedCourseColumns({ departments, disciplines, semesterRegistration, course });

   return <DataTable
      modalTitle="Disciplinas Semestral"
      fileName="Disciplinas Semestral"
      sheetId={uid}
      fileHerderes={herader}
      columns={columns}
      className="sm:max-w-2xl"
      data={offeredCourse}
      actionForm={<CreateOfferedCourseForm semesterRegistration={semesterRegistration} />}
   />;
}
