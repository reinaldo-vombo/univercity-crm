
import { BellRing, Search } from "lucide-react"
import { Input } from "../../ui/input"
import ThemeToggle from "./toggle-theme"
import { DropdownMenu } from "../../shared/dropdwon"
import Avatar from "../../shared/avatar"
import UserSetting from "./user-setting"
import { serverUser } from "@/lib/helper/auth/user"
import { ThemePopOver } from "./theme-popover"
import { getUserNotifications } from "@/services/data/history-logs"
import NotificationTab from "@/components/container/notification-tab"
import Popover from "@/components/shared/popover"
//cmeyvtiab0000ukys0s3kak3u
// type TSeachParams = {
//    searchParams: Promise<{
//       [key: string]: string | string[] | undefined
//    }>
// }
const Header = async () => {
   const user = await serverUser();
   const notifications = await getUserNotifications(user?.id || '')
   const unreadCount = notifications.filter((notification) => !notification.read).length

   return (
      <header className="sticky top-0 flex w-full bg-card">
         <nav className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
            <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
               <div className="hidden lg:block">
                  <div className="relative">
                     <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-600">
                        <Search />
                     </span>
                     <Input
                        type="text"
                        placeholder="Search"
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-border bg-transparent py-2.5 pl-12 pr-14 text-sm text-primary shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                     />
                  </div>
               </div>
            </div>
            <div className="w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none hidden">
               <div className="flex items-center gap-2 2xsm:gap-3">
                  <ThemePopOver />
                  <ThemeToggle />
                  <Popover
                     className="w-[37rem]"
                     trigger={
                        <>
                           <BellRing />
                           {unreadCount > 0 && <span className="absolute rounded-full size-2 bg-green-500 bottom-0 right-0" />}
                        </>}>
                     <NotificationTab data={notifications} />
                  </Popover>
                  <DropdownMenu
                     className="border-none shadow-none"
                     showLogOut={true}
                     lable={user?.name || 'John Doe'}
                     trigger={
                        <div className="flex items-center gap-2">
                           <Avatar name={user?.name || 'John Doe'} photo={user?.avatar || "https://github.com/shadcn.png"} />
                           <span>{user?.name}</span>
                        </div>
                     }
                  >
                     <UserSetting />
                  </DropdownMenu>
               </div>
            </div>
         </nav>
      </header>
   )
}

export default Header;
