
import { getAllUserActionHistory } from "@/services/data/history-logs"
import Avatar from "../shared/avatar"
import { Check, Mail, Pen, Phone, Pin, StarsIcon, Trash } from "lucide-react"
import { Button } from "../ui/button"
import Breadcrumb from "../shared/breadcrumb"
import { ROUTES } from "@/constants/mock-data"
import { getSigleUser } from "@/services/data/user"


const actionIcon = (action: string) => {
   if (action === "CREATE") return <Check fill="blue" className="text-green-500" />
   if (action === "UPDATE") return <Pen fill="green" className="text-blue-500" />
   if (action === "DELETE") return <Trash fill="red" className="text-red-500" />
}
const UserProfilePage = async ({ id }: { id: any }) => {
   console.log(id);

   const [user, audiLogs] = await Promise.all([
      getSigleUser(id),
      getAllUserActionHistory()
   ])
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Perfil"
            pageName={user?.name || ''}
            pageUrl={`${ROUTES.DASHBOARD}/perfil/${user?.name}`}
            root={`${ROUTES.DASHBOARD}/perfil`} />
         <div className="mt-12">
            <div className="grid-cols-12 gap-3">
               <div className="col-span-4">
                  <div className="border rounded-lg p-4">
                     <Avatar name={user?.name || ''} photo={user?.avatar} className="size-40" />
                     <div className="space-y-3">
                        <h2 className="text-3xl">{user?.name}</h2>
                        <ul>
                           <li className="flex items-center gap-3">
                              <span>Cargo:</span>
                              <b>{user?.role}</b>
                           </li>
                           <li className="flex items-center gap-3">
                              <Mail className="text-red-500" />
                              <b>{user?.contact.phone}</b>
                           </li>
                           <li className="flex items-center gap-3">
                              <Phone className="text-violet-500" />
                              <b>{user?.contact.phone}</b>
                           </li>
                           <li className="flex items-center gap-3">
                              <Pin className="text-amber-500" />
                              <b>{user?.contact.location}</b>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="col-span-8">
                  <div className="border rounded-lg p-4">
                     <h2 className="text-2xl">Historico de actividades</h2>
                     <div>
                        {audiLogs.length > 0 ? audiLogs.map((log) => (
                           <div key={log.id} className="space-y-2 border rounded-lg">
                              <div className="flex gap-2">
                                 <Button type="button" variant='outline' size='icon' aria-label="action icon" className='relative'>
                                    {actionIcon(log.action)}
                                 </Button>
                                 <div className="space-y-2">
                                    <h3 className="font-bold">{log.action}</h3>
                                    {log.User && (
                                       <div className="flex items-center gap-4">
                                          <Avatar name={log.User.name} photo={log.User.avatar} className="size-12" />
                                          <span className="line-clamp-1">{log.User.name}</span>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        )) : (
                           <div className="grid items-center space-x-4 place-content-center">
                              <StarsIcon width={30} />
                              <p>Sem historico!</p>
                           </div>)}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

   )
}

export default UserProfilePage;
