

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const StudentBudgetCards = () => {
   return (
      <div className='rounded-2xl p-4 border shadow grid grid-cols-12'>
         <div className="col-span-4 p-4 flex gap-2">
            <div className="space-y-3 w-full">
               <div className='flex text-neutral-500 font-semibold items-center justify-between'>
                  <span>Pagamento anterior</span>
                  <span>July 30 2024</span>
               </div>
               <div className="flex items-center gap-2">
                  <h4 className="text-3xl font-bold">
                     $45000
                  </h4>
                  <Badge className="bg-green-800 text-green-400">Pago</Badge>
               </div>
            </div>
            <Separator orientation="vertical" />
         </div>
         <div className="col-span-4 p-4 flex gap-2">
            <div className="space-y-3 w-full">
               <div className='flex text-neutral-500 font-semibold items-center justify-between'>
                  <span>Proximo Pagamento</span>
                  <span>July 30 2024</span>
               </div>
               <div className="flex items-center gap-2">
                  <h4 className="text-3xl font-bold">
                     $45000
                  </h4>
                  <Badge className="bg-amber-800 text-amber-200">Pendente</Badge>
               </div>
            </div>
            <Separator orientation="vertical" />
         </div>
         <div className="col-span-4 p-4 space-y-3">
            <div className='flex text-neutral-500 font-semibold items-center justify-between'>
               <span>Creditos</span>
               <span>July 30 2024</span>
            </div>
            <div className="flex items-center gap-2">
               <h4 className="text-3xl font-bold">
                  $45000
               </h4>
            </div>
         </div>
      </div>
   )
}

export default StudentBudgetCards;