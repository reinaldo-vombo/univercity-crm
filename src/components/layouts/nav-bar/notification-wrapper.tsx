import NotificationTab from '@/components/container/notification-tab'
import Popover from '@/components/shared/popover'
import { serverUser } from '@/lib/helper/auth/user'
import { getUserNotifications } from '@/services/data/history-logs'
import { BellIcon } from 'lucide-react'

const NotificationWrapper = async () => {
   const user = await serverUser();
   const response = await getUserNotifications(user?.id || '')

   // const unreadMessageCount = notifications.filter((notification) => !notification.read).length
   return (
      <div className="relative">
         <Popover
            className="w-[37rem]"
            trigger={
               <div>
                  <BellIcon />
                  {response.unreadCount > 0 && (<span className='absolute -top-0.5 -right-0.5 size-2 animate-bounce rounded-full bg-sky-600 dark:bg-sky-400' />)}

                  <span className='sr-only'>Notifications</span>
               </div>}>
            <NotificationTab data={response.notifications} userId={user?.id} />
         </Popover>

      </div>
   )
}

export default NotificationWrapper;
