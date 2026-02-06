import { ROUTES } from '@/constants/routes'
import { Info, Settings, User } from 'lucide-react'
import Link from 'next/link'

const links = [
   {
      href: ROUTES.ACCOUNT,
      label: "Minha conta",
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
                     className='group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium hover:bg-primary-foreground'
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
