'use client'

import { BellIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationItem } from './item'
import { TNotifications } from '@/types/global'
import { markAllNotificationAsRead } from '@/actions/activitiys'

type TProps = {
   unreadCount: number;
   unreadItems: TNotifications[];
   notifications: TNotifications[];
}

const NotificationContent = ({ notifications, unreadCount, unreadItems }: TProps) => {

   const markAllRead = async () => {
      await markAllNotificationAsRead()
   }
   return <Popover>
      <PopoverTrigger>
         <Button
            variant='outline'
            size='icon'
            className='relative cursor-pointer'
         >
            <BellIcon className='h-4 w-4' />
            {unreadCount > 0 && (
               <Badge className='absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]'>
                  {unreadCount}
               </Badge>
            )}
            <span className='sr-only'>Notifications</span>

         </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='end'>
         <div className='flex items-center justify-between px-4 py-3 border-b'>
            <div className='flex items-center gap-2'>
               <span className='font-semibold text-sm'>Notifications</span>
               {unreadCount > 0 && (
                  <Badge variant='secondary' className='text-xs px-1.5 py-0'>
                     {unreadCount} new
                  </Badge>
               )}
            </div>
            {unreadCount > 0 && (
               <Button
                  variant='ghost'
                  size='sm'
                  onClick={markAllRead}
                  className='text-xs text-muted-foreground hover:text-foreground cursor-pointer h-auto py-0.5'
               >
                  Mark all read
               </Button>
            )}
         </div>
         <div>
            <Tabs defaultValue='all' className='gap-0'>
               <div className='px-4 py-2 border-b'>
                  <TabsList className='h-8 w-full'>
                     <TabsTrigger value='all' className='flex-1 text-xs'>
                        All
                     </TabsTrigger>
                     <TabsTrigger value='unread' className='flex-1 text-xs'>
                        Unread
                        {unreadCount > 0 && (
                           <span className='text-xs'>({unreadCount})</span>
                        )}
                     </TabsTrigger>
                  </TabsList>
               </div>

               <TabsContent value='all' className='mt-0'>
                  <ScrollArea className='h-64'>
                     <div className='divide-y'>
                        {notifications.map((n) => (
                           <NotificationItem key={n.id} notification={n} />
                        ))}
                     </div>
                  </ScrollArea>
               </TabsContent>

               <TabsContent value='unread' className='mt-0'>
                  <ScrollArea className='h-64'>
                     {unreadItems.length > 0 ? (
                        <div className='divide-y'>
                           {unreadItems.map((n) => (
                              <NotificationItem key={n.id} notification={n} />
                           ))}
                        </div>
                     ) : (
                        <div className='flex flex-col items-center justify-center h-64 gap-2'>
                           <BellIcon className='h-8 w-8 text-muted-foreground/40' />
                           <p className='text-sm text-muted-foreground'>
                              You&apos;re all caught up!
                           </p>
                        </div>
                     )}
                  </ScrollArea>
               </TabsContent>
            </Tabs>

            <div className='px-4 py-3 border-t'>
               <Button
                  variant='ghost'
                  size='sm'
                  className='w-full text-sm cursor-pointer'
               >
                  View all notifications
               </Button>
            </div>
         </div>
      </PopoverContent>
   </Popover>
}

export default NotificationContent
