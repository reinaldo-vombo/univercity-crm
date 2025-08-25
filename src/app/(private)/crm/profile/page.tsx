import UpdatedUserForm from '@/components/forms/admin/update/update-user'
import Avatar from '@/components/shared/avatar'
import Card from '@/components/shared/card'
import SheetModal from '@/components/shared/sheet-modal'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/config/auth'
import { getFirstAndLastName } from '@/lib/helper'
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
               <div className='p-5 w-full mb-6 border rounded-2xl lg:p-6'>
                  <div className="flex items-center justify-between">
                     <div className="flex gap-6 items-center">
                        <Avatar name={user?.name || ''} photo={user?.avatar || ''} className="mr-4 size-12" />
                        <div>
                           <h4 className="text-lg font-semibold">{user?.name || ''}</h4>
                           <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                              <p className="text-sm ">
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
               <div className='p-5 w-full mb-6 border rounded-2xl lg:p-6'>
                  <div>
                     <p className='text-lg font-semibold lg:mb-6'>Informações pessoais</p>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal">Pimero Nome</p>
                     <b className="text-sm font-medium">{firstName}</b>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal">Último Nome</p>
                     <b className="text-sm font-medium ">{lastName}</b>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal ">Email address</p>
                     <b className="text-sm font-medium ">{user?.email}</b>
                  </div>
                  <div>
                     <p className="mb-2 text-xs leading-normal ">Phone</p>
                     <b className="text-sm font-medium ">(+244)</b>
                  </div>
               </div>
            </div>
         </Card>

      </section>
   )
}
