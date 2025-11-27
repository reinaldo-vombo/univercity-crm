"use client";

import { DataTable } from "@/components/shared/data-table";
import { TBuilding, TRoom } from "@/types/global";
import { RoomColumns } from "./columns";
import CreateRoomForm from "@/components/forms/admin/post/create-rooms";
import { createUniqueId } from "@/lib/helper";

interface Props {
   rooms: TRoom[];
   building: TBuilding[]
}
const herader = {
   roomNumber: "Numero da sala",
   floor: "Andar",
}
const uid = createUniqueId("create");
export function RoomTable({ rooms, building }: Props) {

   const roomsWithBuildingTitle = rooms.map((room) => {
      const matchedBuilding = building.find((b) => b.id === room.buildingId);

      return {
         ...room,
         buildingTitle: matchedBuilding?.title ?? "Sem prédio", // fallback if building not found
      };
   });

   const columns = RoomColumns(building);

   return <DataTable
      actionForm={<CreateRoomForm buildings={building} />}
      fileHerderes={herader}
      fileName="Salas"
      sheetId={uid}
      modalTitle="Criar Salas"
      columns={columns}
      data={roomsWithBuildingTitle}
      filterColumn="roomNumber" />;
}
