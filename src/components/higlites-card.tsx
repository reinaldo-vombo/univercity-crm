import React from 'react'
import Card from './sheard/card'

const HighlightsCard = () => {
   return (
      <div className='col-span-12'>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            <Card >
               <p className='text-theme-sm text-gray-500 dark:text-gray-400'>Unique Visitors</p>
               <div className="mt-3 flex items-end justify-between">
                  <div>
                     <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                        24.7K
                     </h4>
                  </div>

                  <div className="flex items-center gap-1">
                     <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                        +20%
                     </span>

                     <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                        Vs last month
                     </span>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   )
}

export default HighlightsCard
