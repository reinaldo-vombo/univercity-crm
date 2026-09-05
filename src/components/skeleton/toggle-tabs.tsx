import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ToggleTabsSkeleton = () => {
   return (
      <div className='grid gap-3'>
         <div className='flex gap-3'>
            <Skeleton className='h-7 w-8' />
            <Skeleton className='h-7 w-8' />
            <Skeleton className='h-7 w-8' />
            <Skeleton className='h-7 w-8' />
         </div>
         <Skeleton className='h-40' />
      </div>
   )
}

export default ToggleTabsSkeleton;
