import { ROUTES } from '@/constants/mock-data'
import { Info, Settings, User } from 'lucide-react'
import Link from 'next/link'

const links = [
   {
      href: ROUTES.ACCOUNT,
      label: "Configurações da conta",
      icon: <User />
   },
   {
      href: ROUTES.SETTINGS,
      label: "Configurações",
      icon: <Settings />
   },
   {
      href: "#",
      label: "Suporte",
      icon: <Info />
   },
]

const UserSetting = () => {
   return (
      <div>
         <ul className='flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4 dark:border-gray-800'>
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className='group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
                  >
                     {link.icon}
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default UserSetting
