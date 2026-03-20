

import { ArrowUpNarrowWide, BanknoteArrowUp } from "lucide-react"

const BudgetCards = () => {
   return (
      <div className='rounded-2xl p-2 shadow grid grid-cols-12'>
         <div className="col-span-4">
            <div className='bg-amber-500 rounded-full size-8'>
               <BanknoteArrowUp />
            </div>
            <div>
               <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  24.7K
               </h4>
               <div className="line-clamp-1 flex gap-2 font-medium">
                  $42,567.10 <span className='text-green-500'>+1.35</span> <ArrowUpNarrowWide className="size-4" />
               </div>
            </div>
         </div>
         <div className="col-span-4">
            <div className="col-span-4">
               <div className='bg-amber-500 rounded-full size-8'>
                  <BanknoteArrowUp />
               </div>
               <div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                     24.7K
                  </h4>
                  <div className="line-clamp-1 flex gap-2 font-medium">
                     $42,567.10 <span className='text-green-500'>+1.35</span> <ArrowUpNarrowWide className="size-4" />
                  </div>
               </div>
            </div>
         </div>
         <div className="col-span-4">
            <div className="col-span-4">
               <div className='bg-amber-500 rounded-full size-8'>
                  <BanknoteArrowUp />
               </div>
               <div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                     24.7K
                  </h4>
                  <div className="line-clamp-1 flex gap-2 font-medium">
                     $42,567.10 <span className='text-green-500'>+1.35</span> <ArrowUpNarrowWide className="size-4" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BudgetCards;