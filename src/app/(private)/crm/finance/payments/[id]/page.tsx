import StudentBudgetCards from '@/components/layouts/cards/student-payment'
import Avatar from '@/components/shared/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { Suspense } from 'react'
import { PaymentTableServer } from './table-wrapper'
import DataTableSkeleton from '@/components/skeleton/data-table'

export default function StudentPayment() {
   return (
      <section className='col-span-12'>
         <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='flex items-center gap-3'>
               <Button variant={'default'} className='rounded-full'>
                  <ArrowLeft />
               </Button>
               <h2 className='text-3xl font-bold'>Pagamentos</h2>
            </div>
            <div className='flex items-center gap-2'>
               <div className='space-y-3'>
                  <h2 className='text-2xl font-bold'>Reinaldo Alvaro Jãoa Vombo</h2>
                  <b>20210626</b>
               </div>
               <Avatar name='Reinaldo Vombo' className='size-16' />
            </div>
         </div>
         <div className="mt-12 space-y-10">
            <StudentBudgetCards />
            <Suspense fallback={<DataTableSkeleton />}>
               <PaymentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
