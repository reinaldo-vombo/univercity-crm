import EventList from '@/components/layouts/event-list'
import TaskList from '@/components/layouts/task-list'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { Calendar1 } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
   title: 'Gerenciamento'
}
export default function ManagementPage() {
   return (
      <section className='col-span-12'>
         <div className="grid grid-cols-12 gap-2">
            <div className='col-span-8 shadow-2xl space-y-10'>
               <div className='col-span-8 rounded-lg p-4 grid grid-cols-12 gap-2 text-white space-y-3 bg-green-500'>
                  <div className='col-span-8 space-y-4 place-content-center'>
                     <h2 className='text-5xl font-semibold'>Gerencie E Planea</h2>
                     <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea porro ipsam ut dolorem praesentium mollitia, quidem neque aspernatur vero beatae?</p>
                     <Button>
                        <Link href={ROUTES.CALENDAR} prefetch={false} className='flex gap-2 text-green-900'>
                           <Calendar1 />
                           Ir ao calendario
                        </Link>
                     </Button>
                  </div>
                  <div className='col-span-4'>
                     <Image
                        src='/image-8.webp'
                        width={400}
                        height={300}
                        alt='Grenn planet' />
                  </div>
               </div>
               <div className="rounded-md bg-card shadow-md p-4 space-y-5">
                  <div className="flex items-center justify-between">
                     <h2 className='text-3xl font-bold'>Eventos Recentes</h2>
                     <Link href='#'>Todos Blogs</Link>
                  </div>
                  <Separator />
                  <div className="grid gap-4">
                     {Array.from({ length: 3 }).map((_, index) => (
                        <EventList key={index} />
                     ))}
                  </div>
               </div>
            </div>
            <div className='col-span-4 space-y-6 bg-card rounded-md p-2'>
               <div>
                  <Calendar className='w-full' />
               </div>
               <div className='space-y-7'>
                  <div className="flex justify-between">
                     <h2 className='text-2xl font-bold'>Minhas Tarefas</h2>
                     <Link href={'#'}>Ver mais</Link>
                  </div>
                  <Separator />
                  <TaskList />
               </div>
            </div>
         </div>
      </section>
   )
}
