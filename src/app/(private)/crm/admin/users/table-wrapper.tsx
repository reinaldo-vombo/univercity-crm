
import { UsersTable } from "./client-table";
import { getAllUsers } from "@/lib/helper/db/querys";


export async function UsersTableServer() {

   const users = await getAllUsers()

   return <UsersTable data={users} />;
}
