import AdminResetPassword from '@/components/forms/admin/update/reset-password'
import Image from 'next/image'
import { Suspense } from 'react'


export default function ResetPasswordPage({ params }: {
   params: Promise<{ token: string }>
}) {

   return (
      <section className="col-span-12 relative p-8 rounded-l-lg flex">
         <div className="px-44 m-auto space-y-5 flex flex-col">
            <div className='flex  items-center justify-center rounded-md'>
               <Image
                  src='/SIGU.png'
                  className="dark:invert"
                  width={70}
                  height={70}
                  alt="SIGU logo" priority />
            </div>
            <div className="flex items-center justify-center">
               <h2 className="font-bold text-3xl">Faça alteração da sua senha</h2>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
               <AdminResetPassword promise={params} />
            </Suspense>
         </div>
      </section>
   )
}
