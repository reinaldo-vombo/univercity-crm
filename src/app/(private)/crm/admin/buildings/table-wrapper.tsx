
import { getAllBuilding } from "@/services/data/academic";
import { BuldingTable } from "./client-table";

export async function BuildingTableServer() {

   const buiding = await getAllBuilding();
   return <BuldingTable buidings={buiding} />;
}
