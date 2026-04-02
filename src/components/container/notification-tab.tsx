
'use client'
import { TNotify } from "@/types/global"
import { CheckCheck } from "lucide-react"
// import MessageFilter from "../shared/message-filter"
import Avatar from "../shared/avatar"
import { formatTimeAgo } from "@/lib/helper"
import { markAllNotificationAsRead, marknotificationAsRead } from "@/actions/activitiys"
import { Button } from "../ui/button"
import NoNotification from "../skeleton/NoNotification"
import { ScrollArea } from "../ui/scroll-area"

type TProps = {
   data: TNotify[]
   userId?: string
}
const NotificationTab = ({ data, userId }: TProps) => {

   const readNotification = async (id: string) => {
      await marknotificationAsRead(id, userId || '')
   }
   const markAllNotificationAsReaded = async () => {
      await markAllNotificationAsRead()
   }

   return (
      <div>
         <div className="flex items-center justify-between text-sm">
            <h2 className="text-2xl">Tuas notificações ({data.length})</h2>
            <Button
               className="text-blue-600"
               variant={'ghost'}
               onClick={() => markAllNotificationAsReaded()}>
               <CheckCheck /> Marcar todas como lidas
            </Button>
         </div>
         {/* <div className="mb-4">
            <MessageFilter />
         </div> */}
         <ScrollArea className="h-96">
            {data.length > 0 ? data.map((notification) => (
               <div className={`rounded-lg p-2 space-y-4 cursor-pointer ${!notification.read && 'bg-secondary'}`} key={notification.id} onClick={() => readNotification(notification.id)}>
                  <div className="flex gap-2.5">
                     <Avatar name="Reginalde Bag" photo={notification.type === 'LOG_IN' ? '/logo.svg' : ''} />
                     <div className="space-y-6">
                        <b>{notification.title}</b>
                        <p>{formatTimeAgo(notification.createdAt)}</p>
                        <div>
                           <p className="font-light">{notification.message}</p>
                           <div className="flex flex-col space-y-3">
                           </div>
                        </div>
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
