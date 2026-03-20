// components/schedule/schedule-grid.tsx

import { groupByDay } from "@/lib/helper/schedule"
import { TStudentSchedule } from "@/types/global"


const DAY_LABELS: Record<string, string> = {
   SEGUNDA: "Segunda", TERCA: "Terça", QUARTA: "Quarta",
   QUINTA: "Quinta", SEXTA: "Sexta",
}
const DAYS_ORDER = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA"] as const
const HOUR_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"]
const AULA_COLORS = [
   { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C" },
   { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489" },
   { bg: "#E1F5EE", border: "#1D9E75", text: "#085041" },
   { bg: "#FAEEDA", border: "#BA7517", text: "#633806" },
   { bg: "#FAECE7", border: "#D85A30", text: "#712B13" },
]

function timeToSlot(t: string) {
   const [h] = t.split(":").map(Number)
   return h - 8
}

function slotSpan(start: string, end: string) {
   return timeToSlot(end) - timeToSlot(start)
}

type TProps = { data: TStudentSchedule }

export function ScheduleGrid({ data }: TProps) {
   const byDay = groupByDay(data.schedule)
   // assign color per discipline name
   const discColors: Record<string, (typeof AULA_COLORS)[0]> = {}
   let ci = 0
   Object.values(data.byDay).flat().forEach((a) => {
      a.disciplines.forEach((d) => {
         if (!discColors[d]) discColors[d] = AULA_COLORS[ci++ % AULA_COLORS.length]
      })
   })

   return (
      <div className="flex flex-col gap-5">
         {/* grade */}
         <div className="overflow-x-auto">
            <div
               className="grid border rounded-lg overflow-hidden"
               style={{ gridTemplateColumns: `52px repeat(${DAYS_ORDER.length}, minmax(0, 1fr))`, minWidth: 560 }}
            >
               {/* header */}
               <div className="bg-muted border-b border-r px-2 py-2.5" />
               {DAYS_ORDER.map((day) => (
                  <div
                     key={day}
                     className="bg-muted border-b border-r last:border-r-0 px-2 py-2.5 text-center text-xs font-medium text-muted-foreground"
                  >
                     {DAY_LABELS[day]}
                  </div>
               ))}

               {/* slots */}
               {HOUR_SLOTS.map((slot, si) => {
                  const isLast = si === HOUR_SLOTS.length - 1
                  return (
                     <>
                        {/* time label */}
                        <div
                           key={`time-${slot}`}
                           className={`bg-muted border-r px-2 pt-1.5 text-right text-[11px] text-muted-foreground ${!isLast ? "border-b" : ""}`}
                        >
                           {slot}
                        </div>

                        {DAYS_ORDER.map((day) => {
                           const aula = byDay[day]?.find(
                              (a) => timeToSlot(a.class.startTime) === si
                           )
                           const span = aula ? slotSpan(aula.class.startTime, aula.class.endTime) : 1
                           const color = aula ? discColors[aula.disciplines[0]] : null

                           return (
                              <div
                                 key={`${day}-${slot}`}
                                 className={`border-r last:border-r-0 p-1 ${!isLast ? "border-b" : ""}`}
                                 style={{ gridRow: aula ? `span ${span}` : undefined, minHeight: 52 }}
                              >
                                 {aula && color ? (
                                    <div
                                       className="rounded-md h-full p-1.5 flex flex-col gap-0.5"
                                       style={{
                                          background: color.bg,
                                          borderLeft: `3px solid ${color.border}`,
                                          minHeight: span * 52 - 8,
                                       }}
                                    >
                                       <span className="text-[12px] font-medium leading-tight" style={{ color: color.text }}>
                                          {aula.disciplines.join(", ")}
                                       </span>
                                       <span className="text-[10px]" style={{ color: color.text, opacity: 0.85 }}>
                                          {aula.class.startTime} – {aula.class.endTime}
                                       </span>
                                       <span className="text-[10px]" style={{ color: color.text, opacity: 0.85 }}>
                                          Sala {aula.class.room} · {aula.class.building}
                                       </span>
                                       {aula.class.faculty && (
                                          <span className="text-[10px]" style={{ color: color.text, opacity: 0.85 }}>
                                             {aula.class.faculty}
                                          </span>
                                       )}
                                    </div>
                                 ) : (
                                    <div className="flex items-center justify-center h-full">
                                       <div className="w-1 h-1 rounded-full bg-border" />
                                    </div>
                                 )}
                              </div>
                           )
                        })}
                     </>
                  )
               })}
            </div>
         </div>

         {/* legenda */}
         <div className="flex flex-wrap gap-3">
            {Object.entries(discColors).map(([disc, color]) => (
               <div key={disc} className="flex items-center gap-1.5 text-xs" style={{ color: color.text }}>
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color.border }} />
                  {disc}
               </div>
            ))}
         </div>
      </div>
   )
}