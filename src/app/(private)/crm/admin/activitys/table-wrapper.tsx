
import { getAllUserActionHistory } from "@/services/data/history-logs";
import { AuditTable } from "./client-table";
import { getAllUsers } from "@/services/data/user";
import { serverUser } from '@/lib/helper/auth/user'
type TProps = {
   // searchOptions?: Record<string, string | string[] | undefined>;
   searchOptions?: any;
}

export async function AuditTableServer({ searchOptions }: TProps) {

   // const commits = await getAllUserActionHistory(searchOptions);
   const [commits, members, loggedUser] = await Promise.all([
      getAllUserActionHistory(searchOptions),
      getAllUsers(),
      serverUser()
   ])
   return <AuditTable
      actionsHistory={commits}
      users={members}
      loggedUser={loggedUser} />;
}
