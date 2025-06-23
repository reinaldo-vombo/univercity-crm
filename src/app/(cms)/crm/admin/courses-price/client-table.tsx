"use client";

import { DataTable } from "@/components/sheard/data-table";
import { TCourse, TCoursePrice } from "@/lib/types/global";
import { CoursesPriceColumns } from "./columns";
import CreateCoursePriceForm from "@/components/forms/admin/post/create-course-price";

interface Props {
   couses: TCourse[];
   coursePrices: TCoursePrice[]
}
const herader = {
   id: "ID",
   price: "Preco",
   course: "Curso",
   courseId: "Codigo do curso",
   createdAt: "Data de criação",
}

export function CoursesPriceTable({ couses, coursePrices }: Props) {

   const modifiedCourses = couses.map(course => {
      return coursePrices.map(price => ({
         ...price,  // Copy the price data
         course: course.title,  // Add the course title
      }));
   }).flat();

   const columns = CoursesPriceColumns(couses);

   return <DataTable
      actionForm={<CreateCoursePriceForm courses={couses} />}
      fileHerderes={herader}
      fileName="Precos-do-curso"
      modalTitle="Criar preços do cursos"
      columns={columns}
      data={modifiedCourses}
      filterColumn="price" />;
}
