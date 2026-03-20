"use client";

import { DataTable } from "@/components/shared/data-table";
import { TPrice } from "@/types/global";
import { PriceColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateCoursePriceForm = dynamic(() => import("@/components/forms/admin/post/create-price"),
   { ssr: false, loading: () => <FormLoading /> })

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
const uid = createUniqueId("create");
export function CoursesPriceTable({ prices }: Props) {

   const columns = PriceColumns();

   return <DataTable
      actionForm={<CreateCoursePriceForm />}
      fileHerderes={herader}
      fileName="preços"
      sheetId={uid}
      modalTitle="Criar preços"
      columns={columns}
      data={prices}
      filterColumn="amount" />;
}
