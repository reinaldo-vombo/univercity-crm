
'use client'
import { TNotification } from "@/types/global"
import { CheckCheck } from "lucide-react"
import MessageFilter from "../shared/message-filter"
import Avatar from "../shared/avatar"
import { formatTimeAgo } from "@/lib/helper"
import { markAllNotificationAsRead, marknotificationAsRead } from "@/actions/activitiys"
import { Button } from "../ui/button"
import NoNotification from "../skeleton/NoNotification"
import { ScrollArea } from "../ui/scroll-area"

type TProps = {
   data: TNotification[]
   userId?: string
}
const NotificationTab = ({ data, userId }: TProps) => {

   const readNotification = async (id: string) => {
      await marknotificationAsRead(id)
   }
   const markAllNotificationAsReaded = async () => {
      if (userId) await markAllNotificationAsRead(userId)
   }

   return (
      <div>
         <div className="flex items-center justify-between text-sm">
            <h2 className="text-2xl">Tuas notificações</h2>
            <Button
               className="text-blue-600"
               variant={'ghost'}
               onClick={() => markAllNotificationAsReaded()}>
               <CheckCheck /> Marcar todas como lidas
            </Button>
         </div>
         <div className="mb-4">
            <MessageFilter />
         </div>
         <ScrollArea className="h-96">
            {data.length > 0 ? data.map((notification) => (
               <div className={`rounded-lg p-2 space-y-4 cursor-pointer ${!notification.read && 'bg-secondary'}`} key={notification.id} onClick={() => readNotification(notification.id)}>
                  <div className="flex items-center gap-2.5">
                     <Avatar name="Reginalde Bag" photo="" />
                     <div className="flex justify-between gap-4">
                        <p className="font-semibold">{notification.message}</p>
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
            )) : (<NoNotification />)}
         </ScrollArea>
      </div>
   )
}

export default NotificationTab
