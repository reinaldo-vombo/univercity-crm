'use client'

import { getFirstAndLastName } from "@/lib/helper";
import SheetModal from "../shared/sheet-modal";
import { Briefcase, Pencil, UserCircle } from "lucide-react";
import UpdatedUserForm from "../forms/admin/update/update-user";
import { Separator } from "../ui/separator";
import Avatar from "../shared/avatar";
import { Checkbox } from "../ui/checkbox";
import { IUser } from "next-auth";
type TProps = {
   user: (IUser & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
   }) | undefined
}

const permition = ['view', 'create', 'edite', 'delete'];
const AccountTab = ({ user }: TProps) => {
   const { firstName, lastName } = getFirstAndLastName(user?.name || '');
   const actions = permition.map((p) => ({
      id: p,
      name: p,
   }))

   return (
      <div className='grid grid-cols-12 gap-2'>
         <div className="col-span-8 space-y-3 pr-5">
            <div className="flex items-center gap-4">
               <div className="flex gap-6 items-center">
                  <Avatar
                     name={user?.name || ''}
                     photo={user?.avatar || ''}
                     className="mr-4 size-20" />
                  <div>
                     <h4 className="text-lg font-semibold">{user?.name || ''}</h4>
                     <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                           {user?.role || ''}
                        </p>
                        <Separator orientation="vertical" />
                     </div>
                  </div>
               </div>
               <div>
                  <SheetModal
                     side='right'
                     trigger={<Pencil className='cursor-pointer text-green-500' />}
                     title="Editar Perfil"
                     description='Editar Perfil'
                     className="">
                     <UpdatedUserForm userInf={user} />
                  </SheetModal>
               </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2 mb-4">
               <UserCircle className='text-slate-200 size-5' />
               <b>Informações pessoais</b>
            </div>
            <ul className="flex items-center gap-2.5 space-y-6">
               <li>Primero nome:
                  <div className='rounded-md border p-2 flex gap-2 items-center mt-1.5'>
                     <b>{firstName}</b>
                  </div>
               </li>
               <li>Ultimo nome:
                  <div className='rounded-md border p-2 flex gap-2 items-center mt-1.5'>
                     <b>{lastName}</b>
                  </div>
               </li>
            </ul>
            <ul className="space-y-6">
               <li>Email:
                  <div className='rounded-md border p-2 flex gap-2 items-center mt-1.5'>
                     <b>{user?.email}</b>
                  </div>
               </li>
               <li>Telemovel:
                  <div className='rounded-md border p-2 flex gap-2 items-center mt-1.5'>
                     <b>(+244) 922 999 999</b>
                  </div>
               </li>
            </ul>
         </div>
         <div className="col-span-4 flex gap-5">
            <Separator orientation="vertical" />
            <div>
               <div className="flex items-center gap-2 my-4">
                  <Briefcase className="text-slate-200 size-4" />
                  <p>Detalhes do trabalho</p>
               </div>
               <ul className="space-y-6">
                  <li>Posição:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <b>{user?.role}</b>
                     </div>
                  </li>
                  <li>Permissões:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        {actions.map((action) => (
                           <div key={action.id} className="flex items-center gap-2">
                              <Checkbox checked={true} disabled />
                              <b>{action.name}</b>
                           </div>
                        ))}
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default AccountTab
