import AdminResetPassword from '@/components/forms/admin/update/reset-password'
import Image from 'next/image'

export default function ResetPasswordPage() {
   return (
      <section className="col-span-12 relative lg:col-span-6 p-8 rounded-l-lg space-y-10">
         <div className="absolute inset-0 z-10 w-full px-44">
            <Image
               className="dark:invert"
               src="/logo.svg"
               alt="Enrollix logo"
               width={180}
               height={38}
               priority
            />
            <div className="flex items-center justify-center">
               <h2 className="font-bold text-3xl">Faça alteração da sua senha</h2>
            </div>
            <AdminResetPassword />
         </div>
      </section>
   )
}
