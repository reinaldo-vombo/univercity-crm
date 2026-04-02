"use client";

import { useState, useMemo } from "react";
import {
   ChevronLeft,
   ChevronRight,
   MapPin,
   Clock,
   BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import {
   format,
   startOfMonth,
   endOfMonth,
   startOfWeek,
   endOfWeek,
   addDays,
   addMonths,
   subMonths,
   isSameDay,
   isSameMonth,
   parseISO,
} from "date-fns";
import { pt } from "date-fns/locale";

interface Retake {
   id: string;
   date: Date;
   time: string;
   discipline: { name: string; id: string };
   course: { title: string; id: string };
   student: { name: string; studentId: string };
   section: { title: string; shift: string };
   location: { building: string; room: string; floor: string };
   payment: string;
   status: string;
}

const PAYMENT_STYLES: Record<string, string> = {
   PAID: "bg-green-100 text-green-700",
   NOT_PAID: "bg-red-100 text-red-700",
   PENDING: "bg-yellow-100 text-yellow-700",
};

export const RetakeCalendar = ({ retakes, }: { retakes: Retake[] }) => {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [selectedDay, setSelectedDay] = useState<string | null>(null);

   const startMonth = startOfMonth(currentDate);
   const endMonth = endOfMonth(currentDate);
   const startCal = startOfWeek(startMonth, { locale: pt });
   const endCal = endOfWeek(endMonth, { locale: pt });

   const retakesByDay = useMemo(() => {
      return retakes.reduce((acc, r) => {
         const formatedDateToString = format(r.date, "yyyy-MM-dd")
         const day = format(parseISO(formatedDateToString), "yyyy-MM-dd");
         if (!acc[day]) acc[day] = [];
         acc[day].push(r);
         return acc;
      }, {} as Record<string, Retake[]>);
   }, [retakes]);

   const days: Date[] = [];
   let current = startCal;

   while (current <= endCal) {
      days.push(current);
      current = addDays(current, 1);
   }

   const selectedRetakes = selectedDay ? retakesByDay[selectedDay] ?? [] : [];

   return (
      <div className="space-y-4">
         <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {format(currentDate, "MMMM yyyy", { locale: pt })}
               </h2>

               <div className="flex gap-2">
                  <button
                     onClick={() => setCurrentDate((d) => subMonths(d, 1))}
                     className="p-1.5 rounded-lg hover:bg-gray-100"
                  >
                     <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                     onClick={() => setCurrentDate(new Date())}
                     className="px-3 py-1 text-xs border rounded-lg hover:bg-gray-50"
                  >
                     Hoje
                  </button>

                  <button
                     onClick={() => setCurrentDate((d) => addMonths(d, 1))}
                     className="p-1.5 rounded-lg hover:bg-gray-100"
                  >
                     <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
               {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                  <div
                     key={d}
                     className="text-center text-xs font-medium text-gray-400 py-1"
                  >
                     {d}
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
               {days.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const dayRetakes = retakesByDay[key] ?? [];

                  const isToday = isSameDay(day, new Date());
                  const isSelected = key === selectedDay;
                  const isCurrentMonth = isSameMonth(day, currentDate);

                  return (
                     <button
                        key={key}
                        onClick={() => setSelectedDay(isSelected ? null : key)}
                        className={`
                    relative min-h-16 p-1.5 rounded-lg text-left transition-all
                    ${!isCurrentMonth ? "opacity-30" : ""}
                    ${isToday ? "ring-2 ring-purple-500" : ""}
                    ${isSelected
                              ? "bg-purple-50 ring-2 ring-purple-300"
                              : "hover:bg-gray-50"
                           }
                  `}
                     >
                        <span
                           className={`
                      text-xs font-medium
                      ${isToday ? "text-purple-600" : "text-gray-700"}
                    `}
                        >
                           {format(day, "d")}
                        </span>
                        <div className="mt-1 space-y-0.5">
                           {dayRetakes.slice(0, 2).map((r) => (
                              <div
                                 key={r.id}
                                 className="text-xs px-1 py-0.5 bg-purple-100 text-purple-700 rounded truncate"
                              >
                                 {r.discipline.name}
                              </div>
                           ))}

                           {dayRetakes.length > 2 && (
                              <div className="text-xs text-gray-400 px-1">
                                 +{dayRetakes.length - 2} mais
                              </div>
                           )}
                        </div>
                     </button>
                  );
               })}
            </div>
         </Card>

         {selectedDay && (
            <Card className="p-4">
               <h3 className="font-semibold text-gray-800 mb-3">
                  {format(parseISO(selectedDay), "EEEE, d 'de' MMMM", {
                     locale: pt,
                  })}
                  <span className="text-sm text-gray-400 ml-2">
                     ({selectedRetakes.length} recurso
                     {selectedRetakes.length !== 1 ? "s" : ""})
                  </span>
               </h3>

               {selectedRetakes.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                     Sem recursos neste dia
                  </p>
               ) : (
                  <div className="space-y-3">
                     {selectedRetakes.map((r) => (
                        <div
                           key={r.id}
                           className="border rounded-xl p-4 space-y-2 hover:bg-gray-50"
                        >
                           <div className="flex items-start justify-between">
                              <div>
                                 <p className="font-medium text-gray-800">
                                    {r.discipline.name}
                                 </p>
                                 <p className="text-xs text-gray-400">
                                    {r.course.title}
                                 </p>
                              </div>

                              <Badge className={PAYMENT_STYLES[r.payment]}>
                                 {r.payment === "PAID"
                                    ? "Pago"
                                    : r.payment === "NOT_PAID"
                                       ? "Não pago"
                                       : "Pendente"}
                              </Badge>
                           </div>

                           <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                 <Clock className="w-3 h-3" />
                                 {r.time}
                              </div>

                              <div className="flex items-center gap-1">
                                 <MapPin className="w-3 h-3" />
                                 {r.location.building} — Sala {r.location.room}
                                 {r.location.floor !== "—" &&
                                    `, ${r.location.floor}º andar`}
                              </div>

                              <div className="flex items-center gap-1">
                                 <BookOpen className="w-3 h-3" />
                                 Turma {r.section.title} ({r.section.shift})
                              </div>
                           </div>

                           <div className="flex items-center gap-2 pt-1 border-t">
                              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-700 font-medium">
                                 {r.student.name[0]}
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-gray-700">
                                    {r.student.name}
                                 </p>
                                 <p className="text-xs text-gray-400">
                                    {r.student.studentId}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </Card>
         )}
      </div>
   );
};