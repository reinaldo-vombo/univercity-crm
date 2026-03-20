
import { getAllBuilding, getAllRoom } from "@/services/data/academic";
import { RoomTable } from "./client-table";
import { serverUser } from "@/lib/helper/auth/user";


export async function RoomTableServer() {

   const [rooms, building, session] = await Promise.all([
      getAllRoom(),
      getAllBuilding(),
      serverUser()
   ]);


   return <RoomTable rooms={rooms} building={building} session={session} />;
}
