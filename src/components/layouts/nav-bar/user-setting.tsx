import { ROUTES } from '@/constants/mock-data'
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

const UserSetting = ({ userId }: { userId: string }) => {

   return (
      <div>
         <ul className='flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4 dark:border-gray-800'>
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href === `${process.env.NEXT_PUBLIC_BASE_URL}/crm/profile` ? `${link.href}/${userId}` : link.href
                     }
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
