import UpdatedUserForm from '@/components/forms/admin/update/update-user'
import Avatar from '@/components/sheard/avatar'
import Card from '@/components/sheard/card'
import SheetModal from '@/components/sheard/sheet-modal'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/helper/auth/config'
import { getFirstAndLastName } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { getServerSession } from 'next-auth'

export default async function ProfilePage() {
   const session = await getServerSession(authOptions)
   const user = session?.user
   const { firstName, lastName } = getFirstAndLastName(user?.name || '');

   return (
      <section className="col-span-12">
         <Card>
            <h1 className="text-2xl font-bold">Profile Page</h1>
            <div className="flex flex-col items-center justify-center h-full mt-4">
               <div className='p-5 w-full mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                  <div className="flex items-center justify-between">
                     <div className="flex gap-6 items-center">
                        <Avatar name={user?.name || ''} photo={user?.avatar || ''} className="mr-4 size-12" />
                        <div>
                           <h4 className="text-lg font-semibold">{user?.name || ''}</h4>
                           <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                 {user?.role || ''}
                              </p>
                              <Separator orientation="vertical" />
                              <p>{user?.email || ''}</p>
                           </div>
                        </div>
                     </div>
                     <div>
                        <SheetModal
                           side='right'
                           trigger={<Pencil className='cursor-pointer' />}
                           title="Editar Perfil"
                           description='Editar Perfil'
                           className="">
                           <UpdatedUserForm userInf={user} />
                        </SheetModal>
                     </div>
                  </div>
               </div>
               <div className='p-5 w-full mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
                  <div>
                     <p className='text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6'>Informações pessoais</p>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Pimero Nome</p>
                     <p className="text-sm font-medium text-gray-800 dark:text-white/90">{firstName}</p>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Último Nome</p>
                     <p className="text-sm font-medium text-gray-800 dark:text-white/90">{lastName}</p>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Email address</p>
                     <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.email}</p>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone</p>
                     <p className="text-sm font-medium text-gray-800 dark:text-white/90">(+244)</p>
                  </div>
               </div>
            </div>
         </Card>

      </section>
   )
}
