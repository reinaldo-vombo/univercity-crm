'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ScheduleGrid } from "./schedule-calendar-preview";
import { TStudentSchedule } from "@/types/global";
import ScheduleList from "./schedule-list";
type TProps = {
   data: TStudentSchedule
}
const ScheduleContainer = ({ data }: TProps) => {
   const [listView, setListView] = useState('list');
   function onChange(view: string) {
      setListView(view)
   }
   return (
      <div>
         <div className="flex items-center gap-3 mb-6">
            <Button onClick={() => onChange('list')} variant={listView === 'list' ? 'default' : 'secondary'}>Lista</Button>
            <Button onClick={() => onChange('grid')} variant={listView === 'grid' ? 'default' : 'secondary'}>Grelha</Button>
         </div>
         {listView === 'list' ? <ScheduleList data={data} /> : <ScheduleGrid data={data} />}
      </div>
   )
}

export default ScheduleContainer
