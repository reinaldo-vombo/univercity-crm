import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

const CalendarSkeleton = () => {
   return (
      <div className="p-4">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
               <Button
                  variant="outline"
                  className="p-2 opacity-75 hover:opacity-100"
               >
                  <ChevronLeft className="w-4 h-4" />
               </Button>
               <Button
                  variant="outline"
                  className="p-2 opacity-75 hover:opacity-100"
               >
                  <ChevronRight className="w-4 h-4" />
               </Button>
            </div>

            <div></div>
         </div>
         <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
               <Skeleton
                  key={day}
                  className="p-2 text-center text-sm font-medium bg-background"
               >
                  {day}
               </Skeleton>
            ))}
            {Array.from({ length: 30 }).map((_, index) => (
               <Skeleton key={index} className="min-h-[200px] rounded-lg" />
            ))}
         </div>

      </div>
   )
}

export default CalendarSkeleton
