"use client";

import { DataTable } from "@/components/shared/data-table";
import { TPrice } from "@/types/global";
import { PriceColumns } from "./columns";
import CreateCoursePriceForm from "@/components/forms/admin/post/create-price";

interface Props {
   prices: TPrice[]
}
const herader = {
   id: "ID",
   amount: "Preco",
   description: "Descrição",
   courseId: "Codigo do curso",
   createdAt: "Data de criação",
}

export function CoursesPriceTable({ prices }: Props) {

   const columns = PriceColumns();

   return <DataTable
      actionForm={<CreateCoursePriceForm />}
      fileHerderes={herader}
      fileName="preços"
      modalTitle="Criar preços"
      columns={columns}
      data={prices}
      filterColumn="amount" />;
}
