'use client'

import { motion } from 'framer-motion'
import AdminLogin from "@/components/forms/admin/post/log-in";
import { Fragment, useState } from "react";
import AdminForgotPassWord from '@/components/forms/admin/post/forgot-password';
import Image from 'next/image';
import { DropdownMenu } from '@/components/shared/dropdwon';
import { Globe } from 'lucide-react';

// export const metadata: Metadata = {
//    title: 'Entrar'
// }
export default function AdminLoginPage() {
   const [isLogin, setIslogin] = useState(true)

   return (
      <Fragment>
         <div className="col-span-12 relative lg:col-span-6 p-8 rounded-l-lg space-y-10">
            <div className='flex items-center justify-between'>
               <div className="rounded-lg p-1 w-fit">
                  <Image src='/logo.svg' width={70} height={70} alt="Enrollix logo" priority />
               </div>
               <DropdownMenu
                  className="border-none shadow-none"
                  lable='Idioma'
                  trigger={
                     <div className="flex items-center gap-2">
                        <Globe /> pt
                     </div>
                  }
               >
                  <p>pt</p>
                  <p>en</p>
               </DropdownMenu>
            </div>
            <motion.div initial={false}
               animate={{ x: isLogin ? "0%" : "-100%" }}
               transition={{ duration: 0.75, ease: "easeInOut" }}
               className="absolute inset-0 z-10 w-full p-44">
               <div className="flex flex-col items-center justify-center space-y-3">
                  <h2 className="font-bold text-3xl">Faça o login para continuar</h2>
                  <p>Acesse todas as feramentas em um só lugar</p>
               </div>
               <AdminLogin onChange={setIslogin} />
            </motion.div>
         </div>
         <div className="col-span-12 relative lg:col-span-6 rounded-l-lg space-y-10 p-44">
            <motion.div initial={false}
               animate={{ x: isLogin ? "100%" : "0%" }}
               transition={{ duration: 0.75, ease: "easeInOut" }}
               className="absolute inset-0 z-10 w-full p-44">
               <div className="flex items-center justify-center">
                  <h2 className="font-bold text-3xl">Esqueceu a sua senha</h2>
               </div>
               <AdminForgotPassWord onChange={setIslogin} />

            </motion.div>
         </div>
         <motion.div
            initial={false}
            animate={{
               left: isLogin ? '49%' : '0%',
               width: isLogin ? '51%' : '51%',
            }}
            transition={{ duration: 0.75 }}
            className="rounded-lg absolute inset-1 bg-white z-0 overflow-hidden w-full">
            <div className="relative size-full">
               <motion.div
                  initial={false}
                  animate={{
                     x: isLogin ? '100%' : 0
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                  className='bg-slate-50 absolute inset-0'
                  style={{ backgroundImage: 'url(/cover-3.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
               <motion.div
                  initial={false}
                  animate={{
                     x: isLogin ? 0 : '-100%'
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                  className='bg-slate-50 absolute inset-0'
                  style={{ backgroundImage: `url(/cover-1.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
            </div>
         </motion.div>
      </Fragment>
   )
}
