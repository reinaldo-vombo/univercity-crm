import { Badge } from "@/components/ui/badge";

import { TStudentSchedule } from "@/types/global";
import ScheduleContainer from "./schedule-container";
type TProps = {
   data: TStudentSchedule
}
const HOUR_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"]
const SchedulePreview = ({ data }: TProps) => {
   const totalAulas = Object.values(data.byDay).reduce((a, d) => a + d.length, 0)

   return (
      <div className="space-y-6">
         <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
               <h2 className="text-base font-semibold">
                  {data.course.title} — {data.section}
               </h2>
               <p className="text-sm text-muted-foreground mt-0.5">
                  {data.semester.title} {data.semester.year} · Turno {data.shift}
               </p>
            </div>
            <div>
               <Badge variant="outline">{totalAulas} aulas / semana</Badge>
               <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                  {HOUR_SLOTS[0]} – {HOUR_SLOTS[HOUR_SLOTS.length - 1]}
               </span>

            </div>
         </div>
         <ScheduleContainer data={data} />
      </div>
   )
}

export default SchedulePreview;
