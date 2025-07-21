"use client";

import { DataTable } from "@/components/shared/data-table";
import { TBuiding } from "@/types/global";
import { BuildingColumns } from "./columns";
import CreateBuildingFrom from "@/components/forms/admin/post/create-building";

interface Props {
   buidings: TBuiding[];
}
const herader = {
   title: "Nome do curso",
}

export function BuldingTable({ buidings }: Props) {
   const columns = BuildingColumns();

   return <DataTable
      actionForm={<CreateBuildingFrom />}
      fileHerderes={herader}
      fileName="Edificios-&-Salas"
      modalTitle="Criar Edificio"
      columns={columns}
      data={buidings}
      filterColumn="title" />;
}
