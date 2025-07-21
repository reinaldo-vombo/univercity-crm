
import { BuldingTable } from "./client-table";
import { getAllBuilding } from "@/lib/helper/db/querys";


export async function BuildingTableServer() {

   const buiding = await getAllBuilding();


   return <BuldingTable buidings={buiding} />;
}
