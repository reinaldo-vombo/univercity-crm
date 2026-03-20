import AdminResetPassword from '@/components/forms/admin/update/reset-password'
import Image from 'next/image'
import { Suspense } from 'react'


export default function ResetPasswordPage() {

   return (
      <section className="col-span-12 relative p-8 rounded-l-lg flex">
         <div className="px-44 m-auto space-y-5 flex flex-col">
            <div className="rounded-lg bg-primary p-2 w-fit m-auto flex">
               <Image
                  className="dark:invert m-auto"
                  src="/logo.svg"
                  alt="Enrollix logo"
                  width={50}
                  height={50}
                  priority
               />
            </div>
            <div className="flex items-center justify-center">
               <h2 className="font-bold text-3xl">Faça alteração da sua senha</h2>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
               <AdminResetPassword />
            </Suspense>
         </div>
      </section>
   )
}
