"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TCourse, TDepartemant, TDiscipline, TExameStatemant, TOfferedCourseSection } from "@/types/global";
import { ExameStatementColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateExameStatemantFrom = dynamic(() => import("@/components/forms/admin/post/exame-statemant"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   statements: TExameStatemant[];
   departments: TDepartemant[]
   course: TCourse[]
   disciplines: TDiscipline[]
   section: TOfferedCourseSection[]
}

const uid = createUniqueId("create");
export function ExameStatementTable({ statements, course, departments, disciplines, section }: Props) {

   const columns = ExameStatementColumns({ course, departments, disciplines, section });

   return <DataTable
      actionForm={
         <CreateExameStatemantFrom
            course={course}
            departments={departments}
            disciplines={disciplines}
            section={section}
         />}
      sheetId={uid}
      side="bottom"
      className="sm:max-w-full"
      modalTitle="Criar Enuciado"
      columns={columns}
      data={statements}
      filterColumn="discipline"
   />;
}
