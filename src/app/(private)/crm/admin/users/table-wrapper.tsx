

import MetricsCard from "@/components/layouts/cards/metrics-card";
import { UsersTable } from "./client-table";
import { getAllUsers } from "@/services/data/user";
import { Star } from "lucide-react";



export async function UsersTableServer() {

   const users = await getAllUsers()
   function usersRoleCount(role: string) {
      const total = users.filter((a) => a.role === role).length
      return total
   }

   const usersSatus = [
      { id: '1', icon: Star, title: 'Super admin', total: usersRoleCount('SUPER_ADMIN') || 0 },
      { id: '2', icon: Star, title: 'Admin', total: usersRoleCount('ADMIN') || 0 },
      { id: '3', icon: Star, title: 'Direitores', total: usersRoleCount('DEPARTMENT_HEAD') || 0 },
      { id: '4', icon: Star, title: 'Contablistas', total: usersRoleCount('ACCOUNTANT') || 0 },
   ]
   return (
      <div className="space-y-20">
         <MetricsCard data={usersSatus} />
         <UsersTable data={users} />
      </div>
   );
}
