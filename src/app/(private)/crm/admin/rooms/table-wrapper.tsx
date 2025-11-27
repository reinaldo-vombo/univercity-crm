
import { getAllBuilding, getAllRoom } from "@/services/data/academic";
import { RoomTable } from "./client-table";


export async function RoomTableServer() {

   const [rooms, building] = await Promise.all([
      getAllRoom(),
      getAllBuilding(),
   ]);


   return <RoomTable rooms={rooms} building={building} />;
}
