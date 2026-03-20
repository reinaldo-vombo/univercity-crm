import { Badge } from '@/components/ui/badge'
import { duration, groupByDay } from '@/lib/helper/schedule'
import { TStudentSchedule } from '@/types/global'
type TProps = {
   data: TStudentSchedule
}

const DAY_LABELS: Record<string, string> = {
   SEGUNDA: "Segunda-feira",
   TERCA: "Terça-feira",
   QUARTA: "Quarta-feira",
   QUINTA: "Quinta-feira",
   SEXTA: "Sexta-feira",
   SABADO: "Sábado",
   DOMINGO: "Domingo",
}
const DAYS_ORDER = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"] as const;
const ScheduleList = ({ data }: TProps) => {
   const byDay = groupByDay(data.schedule)
   return (
      <div>
         {DAYS_ORDER.map((day) => {
            const aulas = byDay[day] ?? []

            return (
               <div key={day}>
                  {/* label do dia */}
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b">
                     <span className="text-sm font-medium text-muted-foreground">
                        {DAY_LABELS[day]}
                     </span>
                     <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {aulas.length} aula{aulas.length !== 1 ? "s" : ""}
                     </span>
                  </div>

                  {aulas.length === 0 ? (
                     <div className="text-center text-sm text-muted-foreground border border-dashed rounded-lg py-5">
                        Sem aulas programadas
                     </div>
                  ) : (
                     <div className="flex flex-col gap-2">
                        {aulas.map((a) => (
                           <div
                              key={a.id}
                              className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-lg border px-4 py-3 hover:bg-muted/40 transition-colors"
                           >
                              {/* horário */}
                              <div className="flex flex-col gap-0.5">
                                 <span className="text-sm font-semibold">{a.class.startTime}</span>
                                 <span className="text-xs text-muted-foreground">{a.class.endTime}</span>
                                 <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded w-fit mt-1">
                                    {duration(a.class.startTime, a.class.endTime)}
                                 </span>
                              </div>

                              {/* disciplina + meta */}
                              <div className="flex flex-col gap-1.5 min-w-0">
                                 <span className="text-sm font-medium truncate">
                                    {a.disciplines.join(", ")}
                                 </span>
                                 <div className="flex flex-wrap gap-1.5">
                                    <Badge variant="secondary" className="text-xs">
                                       Sala {a.class.room} · {a.class.building}
                                    </Badge>
                                    {a.class.faculty && (
                                       <Badge variant="outline" className="text-xs">
                                          {a.class.faculty}
                                       </Badge>
                                    )}
                                 </div>
                              </div>

                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )
         })}
      </div>
   )
}

export default ScheduleList
