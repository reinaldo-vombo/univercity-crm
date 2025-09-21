
'use client'
import { TNotification } from "@/types/global"
import { CheckCheck } from "lucide-react"
import MessageFilter from "../shared/message-filter"
import Avatar from "../shared/avatar"
import { formatTimeAgo } from "@/lib/helper"
import { Separator } from "../ui/separator"
import { marknotificationAsRead } from "@/actions/activitiys"

type TProps = {
   data: TNotification[]
}
const NotificationTab = ({ data }: TProps) => {

   const readNotification = async (id: string) => {
      await marknotificationAsRead(id)
   }

   return (
      <div className="">
         <div className="flex items-center justify-between text-sm">
            <h2 className="text-2xl">Tuas notificações</h2>
            <span className="text-primary flex items-center"><CheckCheck /> Marcar todas como lidas</span>
         </div>
         <div className="mb-4">
            <MessageFilter />
         </div>
         <div>
            {data.length > 0 ? data.map((notification) => (
               <div className={`rounded-lg p-2 space-y-4 cursor-pointer ${!notification.read && 'bg-secondary'}`} key={notification.id} onClick={() => readNotification(notification.id)}>
                  <Separator />
                  <div className="flex items-center gap-2.5">
                     <Avatar name="Reginalde Bag" photo="" />
                     <div className="flex justify-between gap-4">
                        <b>{notification.message}</b>
                        <div className="flex flex-col space-y-3">
                           {!notification.read && <div className="size-2 ml-auto bg-green-700 rounded-full" />}
                           <p>{formatTimeAgo(notification.createdAt)}</p>
                        </div>
                     </div>
                  </div>
                  <div className={`${notification.read ? 'font-bold' : 'font-normal'} space-y-2 px-11`}>
                     <b>{notification.metadata.message}</b>
                     <div className="bg-primary-foreground  rounded-md pl-2">
                        <p>{notification.metadata.description}</p>
                     </div>
                  </div>
                  <div>
                  </div>
               </div>
            )) : (<p>Sem notificações</p>)}
         </div>
      </div>
   )
}

export default NotificationTab
