
import { getAllUserActionHistory } from "@/services/data/history-logs";
import { AuditTable } from "./client-table";
import { getAllUsers } from "@/services/data/user";

export async function AuditTableServer() {
   // const commits = await getAllUserActionHistory(searchOptions);
   const [commits, members] = await Promise.all([
      getAllUserActionHistory(),
      getAllUsers(),
   ])
   return <AuditTable
      actionsHistory={commits}
      users={members}
   />;
}
