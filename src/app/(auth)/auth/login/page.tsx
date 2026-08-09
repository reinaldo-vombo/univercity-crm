
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import LoginForm from '@/components/forms/admin/post/log-in'
import ForgotPassWordForm from '@/components/forms/admin/post/forgot-password'
import { MotionGrid } from '@/components/ui/motion-grid'
export default function LoginPage() {
   const [isLogin, setIslogin] = useState(true)
   return (
      <div className='grid min-h-svh lg:grid-cols-2 col-span-12'>
         <div className='flex flex-col gap-4 p-6 md:p-10'>
            <div className='flex justify-center gap-2 md:justify-start'>
               <a href='#' className='flex items-center gap-2 font-medium'>
                  <div className='flex  items-center justify-center rounded-md'>
                     <Image
                        src='/SIGU.png'
                        className="dark:invert"
                        width={70}
                        height={70}
                        alt="SIGU logo" priority />
                  </div>
               </a>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center overflow-hidden">
               <div className='w-full pl-16'>
                  <h2 className='text-2xl font-semibold'>Bem-vindo de volta</h2>
                  <p>Faça login para continuar</p>
               </div>
               <div className="relative w-full max-w-md min-h-[520px]">
                  <AnimatePresence mode="wait">
                     {isLogin ? (
                        <motion.div
                           key="login"
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: 30 }}
                           transition={{
                              duration: 0.35,
                              ease: [0.4, 0, 0.2, 1],
                           }}
                        >
                           <LoginForm onChange={setIslogin} />
                        </motion.div>
                     ) : (
                        <motion.div
                           key="forgot"
                           initial={{ opacity: 0, x: 30 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -30 }}
                           transition={{
                              duration: 0.35,
                              ease: [0.4, 0, 0.2, 1],
                           }}
                        >
                           <ForgotPassWordForm onChange={setIslogin} />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
         <div className='relative hidden bg-muted lg:block'>
            <MotionGrid
               speed='3s'
               opacity={0.15}
               enableGlow={true}
               lineColor='20, 184, 166'
               className='relative h-full w-full flex flex-col items-center justify-center'
            >
               <div className='relative flex min-h-80 flex-col items-start justify-end overflow-hidden rounded-2xl bg-white p-4 md:p-8 dark:bg-black'>
                  <div className='relative z-40 mb-2 flex items-center gap-2'>
                     <p className='rounded-md bg-black/10 px-2 py-1 text-xs text-black dark:bg-black/50 dark:text-white'>
                        Product Company
                     </p>
                     <p className='rounded-md bg-black/10 px-2 py-1 text-xs text-black dark:bg-black/50 dark:text-white'>
                        Cloud Management
                     </p>
                  </div>

                  <div className='relative z-40 max-w-sm rounded-xl bg-black/5 p-4 backdrop-blur-sm dark:bg-black/50'>
                     <h2 className='text-black dark:text-white'>
                        O SIGU mudou completamente a forma como trabalhamos. O que antes levava horas toda semana agora é totalmente automatizado.
                     </h2>

                     <p className='mt-4 text-sm text-black/60 dark:text-white/50'>
                        Ahdeetai pequeno
                     </p>

                     <p className='mt-1 text-sm text-black/60 dark:text-white/50'>
                        Chefe de Produto,
                        <span className='font-bold text-black dark:text-white'>
                           {' '}
                           ScrollX UI
                        </span>
                     </p>
                  </div>

                  <div className='mask-r-from-50% absolute -top-48 -right-40 z-20 grid rotate-45 transform grid-cols-4 gap-32'>
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                  </div>

                  <div className='mask-r-from-50% absolute top-0 -right-10 z-20 grid rotate-45 transform grid-cols-4 gap-32 opacity-50'>
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                     <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
                  </div>

                  <canvas
                     className='mask-t-from-50% absolute inset-0 z-30 h-full w-200 blur-3xl'
                     width='1000'
                     height='956'
                  />
               </div>
            </MotionGrid>
         </div>
      </div>
   );
}