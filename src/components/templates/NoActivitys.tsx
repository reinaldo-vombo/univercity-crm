import { ActivitySquare } from 'lucide-react'

const NoActivitys = () => {
   return (
      <div className='flex flex-col items-center'>
         <div className='p-2 rounded-md border'>
            <ActivitySquare width={40} />
         </div>
         <p>Sem actividades</p>
      </div>
   )
}

export default NoActivitys
