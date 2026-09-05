import { Inbox, LucideIcon } from 'lucide-react'

type TProps = {
   data: {
      id: string,
      title: string,
      total: number
      icon?: LucideIcon;
      className?: string
   }[]
   className?: string
}

const MetricsCard = ({ data }: TProps) => {
   return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         {data && data.map((item) => {
            return (
               <div className="rounded-xl border p-5 space-y-1" key={item.id}>
                  <div className="flex items-center justify-between">
                     <p className="text-sm text-neutral-500">{item.title}</p>
                     {item.icon ? (
                        <item.icon className={item.className} />
                     ) : <Inbox className="size-4 text-neutral-500" />}

                  </div>
                  <p className="text-2xl font-bold">{item.total}</p>
               </div>
            )
         })}
      </div>
   )
}

export default MetricsCard
