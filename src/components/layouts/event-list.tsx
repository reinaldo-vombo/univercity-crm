import Image from 'next/image'
import React from 'react'

const EventList = () => {
   return (
      <div className='rounded-lg p-3 flex items-center gap-4 shadow-md'>
         <div>
            <Image
               src='/books.jpeg'
               className='rounded-md'
               alt='blog'
               width={200}
               height={200} />
         </div>
         <div className="space-y-3">
            <h1 className='font-bold text-2xl'>All Souls&apos;Day</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate veritatis recusandae inventore? Quae hic modi maxime iste molestiae minima quo, aut at harum eum, optio eligendi adipisci excepturi explicabo repellat.</p>
         </div>
         <div className='bg-white text-black rounded-lg p-2'>
            <p>12</p>
            <span>Oct</span>
         </div>
      </div>
   )
}

export default EventList;
