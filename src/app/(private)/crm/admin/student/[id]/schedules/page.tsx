import React, { Suspense } from 'react'
import SchedulesWrapper from './wrapper'

export default function SchedulePage() {
   return (
      <section className='col-span-12'>
         <Suspense>
            <SchedulesWrapper />
         </Suspense>
      </section>
   )
}
