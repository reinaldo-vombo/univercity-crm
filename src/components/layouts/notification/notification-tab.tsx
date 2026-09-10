

import { getUserNotifications } from '@/services/data/history-logs'
import { serverUser } from '@/lib/helper/auth/user'
import NotificationContent from './notification-content'


const PopoverNotifications = async () => {
   const user = await serverUser();

   if (!user) return 'Utilizador não encontrado'

   const response = await getUserNotifications(user.id);


   const unreadCount = response.unreadCount

   const unreadItems = response.notifications.filter((item) => item.read === false)

   // const readNotification = async (id: string) => {
   //    await marknotificationAsRead(id, user?.id)
   // }

   return <NotificationContent
      notifications={response.notifications}
      unreadCount={unreadCount}
      unreadItems={unreadItems}
      userId={user.id}
   />
}

export default PopoverNotifications
