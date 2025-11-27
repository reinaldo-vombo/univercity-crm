import React from 'react'

const Ping = () => {
   return (
      <div className="relative inline-flex">
         <div className="size-3 bg-green-500 rounded-full" />
         <div className="size-3 right-0 absolute bg-green-500 rounded-full animate-ping" />
      </div>
   )
}

export default Ping
