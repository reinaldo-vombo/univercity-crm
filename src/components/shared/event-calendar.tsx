"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
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
import Modal from "./Modal";
import CreateEventFrom from "../forms/post/create-event";

interface Subscription {
   id: string;
   name: string;
   date: number;
   icon: string;
   color: string;
}
interface SubscriptionDay {
   date: Date;
   subscriptions: Subscription[];
   isCurrentMonth: boolean;
}
const events = [
   {
      id: '1',
      name: 'Some event',
      date: 20,
      color: 'red',
      icon: 'shomthing.png'
   }
]
function EventCalendar() {
   const [subscriptions, setSubscriptions] = React.useState<Subscription[]>(events);
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
            subscriptions: subscriptions.filter(
               (subscription) => subscription.date === day.getDate()
            ),
            isCurrentMonth: isSameMonth(day, firstDayCurrentMonth),
         })
      );
   }, [firstDayCurrentMonth, subscriptions]);
   function previousMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
   }
   function nextMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
   }

   const handleRemoveSubscription = (id: string) => {
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
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

            <Modal trigger={
               <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
               </div>}
               title="Criar evento"
               description="formulario">
               <CreateEventFrom />
            </Modal>
         </div>
         <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
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
                        "relative p-2 bg-background min-h-[100px]",
                        !day.isCurrentMonth && "bg-muted/50",
                        isEqual(day.date, new Date()) && "bg-accent"
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
                           <motion.div
                              key={subscription.id}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 p-1 rounded bg-background border text-sm group"
                              style={{ borderColor: subscription.color }}
                           >
                              <div className="relative w-4 h-4">
                                 <Image
                                    src={subscription.icon}
                                    alt={subscription.name}
                                    className="rounded-sm object-cover"
                                    fill
                                 />
                              </div>
                              <span className="text-xs truncate flex-1">
                                 {subscription.name}
                              </span>
                              <button
                                 onClick={() => handleRemoveSubscription(subscription.id)}
                                 className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                 <X className="w-3 h-3" />
                              </button>
                           </motion.div>
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