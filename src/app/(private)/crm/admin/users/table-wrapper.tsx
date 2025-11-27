
import { UsersTable } from "./client-table";
import { getAllUsers } from "@/services/data/user";


export async function UsersTableServer() {

   const users = await getAllUsers()

   return <UsersTable data={users} />;
}
