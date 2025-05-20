'use client'
import { BellRing, Search } from "lucide-react"
import { Input } from "../../ui/input"
import ThemeToggle from "./toggle-theme"
import { DropdownMenu } from "../dropdwon"
import Avatar from "../avatar"
import UserSetting from "./user-setting"
import { User } from "@/lib/helper/auth/user"

const Header = () => {
   const user = User();

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
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                     />
                  </div>
               </div>
            </div>
            <div className="w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none hidden">
               <div className="flex items-center gap-2 2xsm:gap-3">
                  <ThemeToggle />
                  <DropdownMenu
                     className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                     lable="Notificações"
                     trigger={<BellRing />}>
                     notifications
                  </DropdownMenu>
                  <DropdownMenu
                     className="border-none shadow-none"
                     showLogOut={true}
                     lable={user?.name || 'John Doe'}
                     trigger={<Avatar name={user?.name || 'John Doe'} photo={user?.avatar || "https://github.com/shadcn.png"} />}>
                     <UserSetting />
                  </DropdownMenu>
               </div>
            </div>
         </nav>
      </header>
   )
}

export default Header
