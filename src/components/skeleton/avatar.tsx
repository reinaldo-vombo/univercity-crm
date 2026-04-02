import React from 'react'
import { Skeleton } from '../ui/skeleton'

const AvatarSkeleton = () => {
   return (
      <div className='flex items-center gap-3'>
         <Skeleton className='size-12 rounded-full' />
         <Skeleton className='w-14 h-3 rounded-full' />
      </div>
   )
}

export default AvatarSkeleton;
