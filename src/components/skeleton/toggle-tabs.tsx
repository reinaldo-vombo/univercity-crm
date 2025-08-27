import React from 'react'

const ToggleTabs = () => {
   return (
      <div className='grid gap-3'>
         <div className='flex gap-3'>
            <div className="h-7 bg-muted rounded-md animate-pulse"></div>
            <div className="h-7 bg-muted rounded-md animate-pulse"></div>
         </div>
         <div className="h-40 bg-muted rounded-md animate-pulse"></div>
      </div>
   )
}

export default ToggleTabs
