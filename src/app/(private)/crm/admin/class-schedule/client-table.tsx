"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { TClassShedule, TDiscipline, TOfferedCourseSection, TRoom, TSemesterRegistration } from "@/types/global";
import { OfferedCourseSectionColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"

const CreateOfferedCourseClassForm = dynamic(() => import("@/components/forms/admin/post/create-schedule"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   schedules: TClassShedule[];
   sections: TOfferedCourseSection[];
   disciplines: TDiscipline[]
   rooms: TRoom[]
   semesterRegistrations: TSemesterRegistration[]
}
const uid = createUniqueId("create");
export function OfferedCourseSectinTable({ schedules, disciplines, rooms, sections, semesterRegistrations }: Props) {

   const columns = OfferedCourseSectionColumns({ disciplines, rooms, sections, semesterRegistrations });

   return <DataTable
      modalTitle="Turmas"
      fileName="Turmas"
      sheetId={uid}
      columns={columns}
      className="sm:max-w-2xl"
      data={schedules}
      actionForm={<CreateOfferedCourseClassForm disciplines={disciplines} offereSections={sections} rooms={rooms} semesterRegistration={semesterRegistrations} />}
   />;
}
