import Avatar from "@/components/shared/avatar";
import NoActivitys from "@/components/templates/NoActivitys";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getAllUserActionHistory } from "@/services/data/history-logs";
import { Check, Pen, Trash } from "lucide-react";


export default async function ActivityLogsWrapper() {
   const activitys = await getAllUserActionHistory()
   const actionIcon = (action: string) => {
      if (action === "CREATE") return <Check fill="blue" />
      if (action === "UPDATE") return <Pen fill="green" className="text-blue-500" />
      if (action === "DELETE") return <Trash fill="red" className="text-red-500" />
   }
   return (
      <div className="space-y-5">
         <span> <b>{activitys.length}</b> novas atualizações</span>
         <Separator />
         <ScrollArea className="h-[420px]">
            <div className="flex flex-col gap-3.5">
               {activitys.length > 0 ? activitys.map((log, index) => index < 10 && (
                  <div className="flex gap-2 items-center" key={log.id}>
                     <Button variant='outline' size='icon' className='relative'>
                        {actionIcon(log.action)}
                     </Button>
                     <div className="space-y-2">
                        <h3 className="font-bold">{log.action}</h3>
                        {log.user && (
                           <div className="flex items-center gap-4">
                              <Avatar name={log.user.name} photo={log.user.avatar} className="size-12" />
                              <span className="line-clamp-1">{log.user.name}</span>
                           </div>
                        )}
                     </div>
                  </div>
               )) : (<NoActivitys />)}
            </div>
         </ScrollArea>
      </div>
   )
}
