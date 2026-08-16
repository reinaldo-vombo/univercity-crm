import Avatar from "@/components/shared/avatar"
import { ArrowRightLeft, CalendarDays, FileText, GraduationCap, MessageSquare, ShieldAlert, User, Wallet } from 'lucide-react'
import { cn } from "@/lib/utils"
import { TNotificationType } from "@/types/enum";
import { TNotifications } from "@/types/global";
import { formatDateTime } from "@/lib/helper";


type TProps = {
   notification: TNotifications
}

const typeConfig: Record<
   TNotificationType,
   { icon: React.ReactNode; color: string }
> = {
   LOG_IN: {
      icon: <User className="h-2.5 w-2.5" />,
      color: "bg-sky-500",
   },
   ACADEMIC: {
      icon: <GraduationCap className="h-2.5 w-2.5" />,
      color: "bg-blue-500",
   },
   PAYMENT: {
      icon: <Wallet className="h-2.5 w-2.5" />,
      color: "bg-emerald-500",
   },
   TRANSFER: {
      icon: <ArrowRightLeft className="h-2.5 w-2.5" />,
      color: "bg-amber-500",
   },
   DOCUMENT: {
      icon: <FileText className="h-2.5 w-2.5" />,
      color: "bg-orange-500",
   },
   SEMESTER: {
      icon: <CalendarDays className="h-2.5 w-2.5" />,
      color: "bg-purple-500",
   },
   CONTENT: {
      icon: <MessageSquare className="h-2.5 w-2.5" />,
      color: "bg-pink-500",
   },
   SYSTEM: {
      icon: <ShieldAlert className="h-2.5 w-2.5" />,
      color: "bg-slate-500",
   },
};

export const NotificationItem = ({ notification }: TProps) => {
   const config = typeConfig[notification.type]
   return (
      <div
         className={cn(
            'flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer',
            notification.read && 'bg-muted dark:bg-muted/30',
         )}
      >
         <div className='relative shrink-0 h-fit'>
            <Avatar name={''} photo={''} className='h-9 w-9' />
            <span
               className={cn(
                  'absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center text-white',
                  config.color || '#000',
               )}
            >
               {config.icon}
            </span>
         </div>
         <div className={cn('flex-1 min-w-0', notification.metadata.description && 'max-w-56')}>
            <p className='text-sm leading-snug'>
               <span className='font-medium'>{notification.title}</span>{' '}
               <span className='text-muted-foreground'>{notification.message}</span>
            </p>
            {notification.metadata.description && (
               <p className='text-xs text-muted-foreground mt-0.5 truncate'>
                  {notification.metadata.description}
               </p>
            )}
            <p className='text-xs text-muted-foreground mt-1'>{formatDateTime(notification.createdAt)}</p>
         </div>
         {notification.read && (
            <div className='h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0' />
         )}
      </div>
   )
}