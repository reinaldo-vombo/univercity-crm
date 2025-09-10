
import { getAllUserActionHistory } from "@/services/data/history-logs";
import { AuditTable } from "./client-table";


export async function AuditTableServer() {

   const commits = await getAllUserActionHistory();


   return <AuditTable actionsHistory={commits} />;
}
