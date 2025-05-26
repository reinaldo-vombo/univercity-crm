'use client'

import { motion } from 'framer-motion'
import AdminLogin from "@/components/forms/admin/log-in";
import { Fragment, useState } from "react";
import AdminForgotPassWord from '@/components/forms/admin/forgot-password';

export default function AdminLoginPage() {
   const [isLogin, setIslogin] = useState(true)
   return (
      <Fragment>
         <div className="col-span-12 lg:col-span-6 p-8 rounded-l-lg space-y-10 px-44">
            <div className="flex items-center justify-center">
               <h2 className="font-bold text-3xl">Admin</h2>
            </div>
            <AdminLogin onChange={setIslogin} />
         </div>
         <div className="col-span-12 lg:col-span-6 p-8 rounded-l-lg space-y-10 px-44">
            <div className="flex items-center justify-center">
               <h2 className="font-bold text-3xl">Esqueceu a sua senha</h2>
            </div>
            <AdminForgotPassWord onChange={setIslogin} />
         </div>
         <motion.div
            initial={false}
            animate={{
               left: isLogin ? '49%' : '0%',
               width: isLogin ? '51%' : '51%',
            }}
            transition={{ duration: 0.75 }}
            className="rounded-lg absolute inset-1 bg-white z-0 overflow-hidden w-full">
            <div className="relative">
               <motion.div
                  initial={false}
                  animate={{
                     x: isLogin ? '100%' : 0
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                  className='bg-slate-50 absolute inset-0'
                  style={{ background: `url()`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
               <motion.div
                  initial={false}
                  animate={{
                     x: isLogin ? 0 : '-100%'
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                  className='bg-slate-50 absolute inset-0'
                  style={{ background: `url()`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
            </div>
         </motion.div>
      </Fragment>
   )
}
