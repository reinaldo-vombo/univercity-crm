import UpdatedAccountForm from '@/components/forms/admin/update/update-account'
import Avatar from '@/components/shared/avatar'
import Breadcrumb from '@/components/shared/breadcrumb'
import Card from '@/components/shared/card'
import SheetModal from '@/components/shared/sheet-modal'
import { ROUTES } from '@/constants/routes'
import { createUniqueId, getFirstAndLastName } from '@/lib/helper'
import { serverUser } from '@/lib/helper/auth/user'
import { Pencil, Star } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Perfil'
}
const uid = createUniqueId("view");
export default async function ProfilePage() {
   const user = await serverUser()
   const { firstName, lastName } = getFirstAndLastName(user?.name || '');

   if (!user) {
      return 'Utilizador não encontrado'
   }
   return (
      <section className="col-span-12">
         <Breadcrumb
            name={user.name}
            pageName="Perfil"
            pageUrl={`${ROUTES.DASHBOARD}/perfil`}
            root={`${ROUTES.DASHBOARD}/perfil`} />
         <div className="mt-12">
            <Card showTitle={false}>
               <h1 className="text-2xl font-bold">Perfil</h1>
               <div className="flex flex-col items-center justify-center h-full mt-4">
                  <div className='p-5 w-full mb-6 border rounded-2xl lg:p-6'>
                     <div className="flex items-center justify-between">
                        <div className="flex gap-6 items-center">
                           <Avatar name={user.name} photo={user.avatar} className="mr-4 size-16" />
                           <div>
                              <h4 className="text-lg font-semibold">{user.name}</h4>
                              <b className="flex items-center gap-2">
                                 <Star className='text-amber-500' />
                                 {user.role}
                              </b>
                           </div>
                        </div>
                        <div>
                           <SheetModal
                              side='right'
                              id={uid}
                              trigger={<Pencil className='cursor-pointer' />}
                              title="Editar Perfil"
                              description='Formulario para Editar Perfil'
                              className="sm:max-w-lg">
                              <UpdatedAccountForm defaultValues={user} />
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
                        <p className="mb-2 text-xs leading-normal">Email address</p>
                        <b className="text-sm font-medium ">{user.email}</b>
                     </div>
                     <div>
                        <p className="mb-2 text-xs leading-normal">Phone</p>
                        <b className="text-sm font-medium ">(+244) {user.contact?.phone}</b>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

      </section>
   )
}
