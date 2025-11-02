"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pen, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";


import { cn } from "@/lib/utils";
import {
   add,
   eachDayOfInterval,
   endOfMonth,
   format,
   isEqual,
   isSameMonth,
   isToday,
   parse,
   startOfMonth,
   startOfWeek,
   endOfWeek,
} from "date-fns";
import { TCalendar } from "@/types/global";
import SheetModal from "../shared/sheet-modal";
import CreateEventFrom from "../forms/post/create-calendar-envent";
import { deleteCalendarEvent } from "@/actions/calendar";
import { toast } from "sonner";
import { isSameDay } from "date-fns";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import Modal from "../shared/Modal";
import { Badge } from "../ui/badge";
import Tooltip from "../shared/tooltip";
import Avatar from "../shared/avatar";
import { formatDateTime } from "@/lib/helper";
import UpdateEventCalendarFrom from "../forms/update/updated-calendar";
type TProps = {
   subscriptions: TCalendar[]
}
interface SubscriptionDay {
   date: Date;
   subscriptions: TCalendar[];
   isCurrentMonth: boolean;
}

function EventCalendar({ subscriptions }: TProps) {
   const normalizedSubscriptions = React.useMemo(
      () =>
         subscriptions.map((s) => ({
            ...s,
            start: new Date(s.start),
            end: new Date(s.end),
         })),
      [subscriptions]
   );

   const [currentMonth, setCurrentMonth] = React.useState(
      format(new Date(), "MMM-yyyy")
   );
   const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
   const days = React.useMemo(() => {
      const start = startOfWeek(startOfMonth(firstDayCurrentMonth));
      const end = endOfWeek(endOfMonth(firstDayCurrentMonth));
      return eachDayOfInterval({ start, end }).map(
         (day): SubscriptionDay => ({
            date: day,
            subscriptions: normalizedSubscriptions.filter((subscription) =>
               isSameDay(subscription.start, day)
            ),
            isCurrentMonth: isSameMonth(day, firstDayCurrentMonth),
         })
      );
   }, [firstDayCurrentMonth, normalizedSubscriptions]);
   function previousMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
   }
   function nextMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
   }

   const handleRemoveSubscription = async (id: string) => {
      const result = await deleteCalendarEvent(id)
      if (result.error) {
         toast.error(result.message)
      }
      toast.success(FLASH_MESSAGE.DELETED)

   };
   return (
      <div className="p-4">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
               <Button
                  variant="outline"
                  className="p-2 opacity-75 hover:opacity-100"
                  onClick={previousMonth}
               >
                  <ChevronLeft className="w-4 h-4" />
               </Button>
               <Button
                  variant="outline"
                  className="p-2 opacity-75 hover:opacity-100"
                  onClick={nextMonth}
               >
                  <ChevronRight className="w-4 h-4" />
               </Button>
               <motion.h2
                  key={currentMonth}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-semibold"
               >
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
               </motion.h2>
            </div>

            <SheetModal side="bottom" trigger={
               <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Publicar evento
               </div>}
               title="Criar evento"
               description="formulario">
               <CreateEventFrom />
            </SheetModal>
         </div>
         <div className="grid grid-cols-7 gap-2 p-1 bg-muted rounded-lg overflow-hidden">
            <AnimatePresence mode="popLayout" >
               {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <motion.div
                     key={day}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="p-2 text-center text-sm font-medium bg-background"
                  >
                     {day}
                  </motion.div>
               ))}
               {days.map((day, dayIdx) => (
                  <motion.div
                     key={format(day.date, "yyyy-MM-dd")}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: dayIdx * 0.02 }}
                     className={cn(
                        "relative p-2 bg-background min-h-[200px] rounded-lg",
                        !day.isCurrentMonth && "bg-muted/50 border border-background",
                        isEqual(day.date, new Date()) && "bg-accent border border-red-500"
                     )}
                  >
                     <time
                        dateTime={format(day.date, "yyyy-MM-dd")}
                        className={cn(
                           "text-sm",
                           isToday(day.date) && "font-semibold text-primary",
                           !day.isCurrentMonth && "text-muted-foreground"
                        )}
                     >
                        {format(day.date, "d")}
                     </time>
                     <div className="space-y-1 mt-1">
                        {day.subscriptions.map((subscription) => (
                           <Modal
                              title={subscription.title}
                              description='Descrição do evento'
                              key={subscription.id}
                              trigger={
                                 <Badge>{subscription.title}</Badge>
                              }>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-2">
                                    <Button type="button" aria-label="Delete event button" className="bg-red-500" onClick={() => handleRemoveSubscription(subscription.id)}>
                                       <Trash className="text-red-300" />
                                    </Button>
                                    <SheetModal
                                       trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                                       side="bottom"
                                       title="Atualização do evento"
                                       description='Formulario de atualização do evento'>
                                       <UpdateEventCalendarFrom values={subscription} />
                                    </SheetModal>
                                 </div>
                                 <h2 className="text-2xl">{subscription.title}</h2>
                                 <ul className="space-y-4">
                                    <li className="flex">
                                       <p className="text-justify">{subscription.description}</p>
                                    </li>
                                    <li>Categoria: <Badge className="bg-amber-500">{subscription.type}</Badge></li>
                                    <li>Local: {subscription.location}</li>
                                    <li className="flex items-center gap-2">Publicador: <Tooltip trigger={<Avatar name="Reginalde Baggle" className="size-7" />}>
                                       Reginalde</Tooltip></li>
                                    <li className="flex items-center">Data de publicação: {formatDateTime(subscription.createdAt)}</li>
                                 </ul>
                              </div>
                           </Modal>

                        ))}
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

      </div>
   );
}


export default EventCalendar