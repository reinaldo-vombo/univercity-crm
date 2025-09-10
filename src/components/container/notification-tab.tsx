

import { TNotification } from "@/types/global"
import { Check } from "lucide-react"
import MessageFilter from "../shared/message-filter"
import Avatar from "../shared/avatar"
import { marknotificationAsRead } from "@/actions/activitiys"

type TProps = {
   data: TNotification[]
}
const NotificationTab = ({ data }: TProps) => {
   console.log('notification', data);

   const readNotification = async (id: string) => {
      await marknotificationAsRead(id)
   }

   return (
      <div className="w-44">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl">Tuas notificações</h2>
            <span className="text-blue-500"><Check /> Marcar todas como lidas</span>
         </div>
         <div>
            <MessageFilter />
         </div>
         <div>
            {data.length > 0 ? data.map((notification) => (
               <div className={`flex items-center justify-between rounded-lg ${notification.read && 'bg-slate-200'}`} key={notification.id} onClick={() => readNotification(notification.id)}>
                  <div className="flex items-center gap-2.5">
                     <Avatar name="Reginalde Bag" photo="" />
                     <div className={`${notification.read ? 'font-bold' : 'font-normal'} space-y-2`}>
                        <b>{notification.metadata.message}</b>
                        <p>Sexta 5:00pm</p>
                        <div className="bg-slate-400 rounded-md p-2">
                           <p>{notification.metadata.description}</p>
                        </div>
                     </div>
                  </div>
                  <div>
                     {notification.read && <span className="size-4 bg-blue-700 rounded-full" />}
                     <p className="text-slate-300">2 horas atras</p>
                  </div>
               </div>
            )) : (<p>Sem notificações</p>)}
         </div>
      </div>
   )
}

export default NotificationTab
