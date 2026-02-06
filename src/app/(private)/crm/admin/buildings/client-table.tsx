"use client";

import { DataTable } from "@/components/shared/data-table";
import { TBuilding } from "@/types/global";
import { BuildingColumns } from "./columns";
import { createUniqueId } from "@/lib/helper";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const CreateBuildingFrom = dynamic(() => import("@/components/forms/admin/post/create-building"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   buidings: TBuilding[];
}
const herader = {
   title: "Nome do curso",
}

const uid = createUniqueId("create");
export function BuldingTable({ buidings }: Props) {
   const columns = BuildingColumns();

   return <DataTable
      actionForm={<CreateBuildingFrom />}
      fileHerderes={herader}
      sheetId={uid}
      fileName="Edificios-&-Salas"
      modalTitle="Criar Edificio"
      columns={columns}
      data={buidings}
      filterColumn="title" />;
}
