
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import { TActionHistory } from '@/types/global';
import { Check, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
type TProps = {
   data: TActionHistory[]
}

const actionIcon = (action: string) => {
   if (action === "CREATE") return <Check fill="blue" />
   if (action === "UPDATE") return <Pen fill="green" className="text-blue-500" />
   if (action === "DELETE") return <Trash fill="red" className="text-red-500" />
}
const ActivityLogsPreview = ({ data }: TProps) => {
   return (
      <div className="bg-card rounded-lg p-4">
         <span className="font-semibold">Últimas Actividades</span>
         <div className="bg-card rounded-md p-2">
            <div className="space-y-5">
               <span> <b>{data.length}</b> novas atualizações</span>
               <Separator />
               <ScrollArea className="h-[450px]">
                  <div className="flex flex-col gap-3.5">
                     {data.length > 0 ? data.map((log, index) => index < 10 && (
                        <div key={log.id} className="space-y-2">
                           <div className="flex gap-2">
                              <Button variant='outline' size='icon' aria-label="action icon" className='relative'>
                                 {actionIcon(log.action)}
                              </Button>
                              <div className="space-y-2">
                                 <h3 className="font-bold">{log.action}</h3>
                                 {log.user && (
                                    <div className="flex items-center gap-4">
                                       {/* <Avatar name={log.user.name} photo={log.user.avatar} className="size-12" /> */}
                                       <span className="line-clamp-1">{log.user.name}</span>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <Separator />
                        </div>
                     )) : (<p>Sem atividades</p>)}
                  </div>
               </ScrollArea>
            </div>
            <div className="mt-3.5 flex flex-col items-center justify-center space-y-4">
               <Separator />
               <Link
                  href={`${ROUTES.DASHBOARD}/admin/activitys`}
                  className="text-primary"
                  prefetch={false}>Mais historicos</Link>
            </div>
         </div>
      </div>
   )
}

export default ActivityLogsPreview;
