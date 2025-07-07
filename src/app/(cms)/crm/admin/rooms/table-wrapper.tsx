
import { RoomTable } from "./client-table";
import { getAllBuilding, getAllRoom } from "@/lib/helper/db/querys";


export async function RoomTableServer() {

   const [rooms, building] = await Promise.all([
      getAllRoom(),
      getAllBuilding(),
   ]);


   return <RoomTable rooms={rooms} building={building} />;
}
