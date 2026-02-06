import React from 'react'
import { Skeleton } from '../ui/skeleton'

const FormLoading = () => {
   return (
      <div className='space-y-4 p-4'>
         <Skeleton className="h-10 w-full rounded-md bg-muted" />
         <Skeleton className="h-10 w-full rounded-md bg-muted" />
         <Skeleton className="h-10 w-full rounded-md bg-muted" />
         <Skeleton className="h-10 w-32 rounded-md bg-muted" />
      </div>
   )
}

export default FormLoading;
