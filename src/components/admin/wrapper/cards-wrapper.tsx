import Avatar from "@/components/shared/avatar";
import NoActivitys from "@/components/templates/NoActivitys";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import { filterActionHistoryByDate } from "@/lib/helper";
import { getAllUserActionHistory } from "@/services/data/history-logs";
import { Check, Pen, Trash } from "lucide-react";


export default async function ActivityLogsWrapper() {
   const activitys = await getAllUserActionHistory()
   // const filterActivitys = filterActionHistoryByDate(activitys, 'today');
   // console.log(filterActivitys)
   const actionIcon = (action: string) => {
      if (action === "CREATE") return <Check fill="blue" />
      if (action === "UPDATE") return <Pen fill="green" className="text-blue-500" />
      if (action === "DELETE") return <Trash fill="red" className="text-red-500" />
   }
   return (
      <div className="space-y-5">
         <span> <b>{activitys.length}</b> novas atualizações</span>
         <Separator />
         <ScrollArea className="h-[450px]">
            <div className="flex flex-col gap-3.5">
               {activitys.length > 0 ? activitys.map((log, index) => index < 10 && (
                  <div key={log.id} className="space-y-2">
                     <div className="flex gap-2">
                        <Button variant='outline' size='icon' aria-label="action icon" className='relative'>
                           {actionIcon(log.action)}
                        </Button>
                        <div className="space-y-2">
                           <h3 className="font-bold">{log.action}</h3>
                           {log.User && (
                              <div className="flex items-center gap-4">
                                 <Avatar name={log.User.name} photo={log.User.avatar} className="size-12" />
                                 <span className="line-clamp-1">{log.User.name}</span>
                              </div>
                           )}
                        </div>
                     </div>
                     <Separator />
                  </div>
               )) : (<NoActivitys />)}
            </div>
         </ScrollArea>
      </div>
   )
}
