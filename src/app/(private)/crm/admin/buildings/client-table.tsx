"use client";

import { DataTable } from "@/components/shared/data-table";
import { TBuilding } from "@/types/global";
import { BuildingColumns } from "./columns";
import CreateBuildingFrom from "@/components/forms/admin/post/create-building";
import { createUniqueId } from "@/lib/helper";

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
