import { Suspense } from "react"
import { Input } from "../../ui/input"
import { ThemePopOver } from "./theme-popover"
import { Search } from "lucide-react"
import ThemeToggle from "./toggle-theme"
import LanguageSwitcher from "../LanguageSwitcher"
import AvatarSkeleton from "@/components/skeleton/avatar"
import NotificationSkeleton from "@/components/skeleton/notification"
import UserDropdownMenu from "./user-toolkit/user-menu"
import PopoverNotifications from "../notification/notification-tab"
import { SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
   return (
      <header className="sticky w-full top-0 z-50 bg-card px-4 before:absolute before:inset-0 before:rounded-t-xl before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md sm:px-6">
         <nav className="bg-card relative z-51  mt-3 flex w-full items-center justify-between rounded-xl border px-6 py-2 mx-auto max-w-(--breakpoint-2xl)">
            <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
               <div className="flex items-center">
                  <SidebarTrigger className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 " />
                  <div className="relative">
                     <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-600">
                        <Search />
                     </span>
                     <Input
                        type="text"
                        placeholder="Search"
                        className="h-11 w-full rounded-lg border border-border bg-transparent py-2.5 pl-12 pr-14 text-sm text-primary shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                     />
                  </div>
               </div>
            </div>
            <div className="w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none hidden">
               <div className="flex items-center gap-4 sm:gap-3">
                  <LanguageSwitcher />
                  <ThemePopOver />
                  <ThemeToggle />
                  <Suspense fallback={<NotificationSkeleton />}>
                     <PopoverNotifications />
                  </Suspense>
                  <Suspense fallback={<AvatarSkeleton />}>
                     <UserDropdownMenu />
                  </Suspense>
               </div>
            </div>
         </nav>
      </header>
   )
}

export default Header;
