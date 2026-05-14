"use client";

import { DataTable } from "@/components/shared/data-table";
import { TOfferedCourse, TOfferedCourseSection, TPrice } from "@/types/global";
import { OfferedCourseSectionColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateOfferedCourseSectionForm = dynamic(() => import("@/components/forms/admin/post/offered-course-section"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   offeredCourse: TOfferedCourse[];
   sections: TOfferedCourseSection[];
   prices: TPrice[]
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
export function OfferedCourseSectinTable({ sections, offeredCourse, prices }: Props) {

   const columns = OfferedCourseSectionColumns({ offeredCourse, prices });

   return <DataTable
      modalTitle="Turmas"
      fileName="Turmas"
      sheetId={uid}
      fileHerderes={herader}
      columns={columns}
      className="sm:max-w-2xl"
      data={sections}
      actionForm={<CreateOfferedCourseSectionForm offeredCourses={offeredCourse} />}
   />;
}
