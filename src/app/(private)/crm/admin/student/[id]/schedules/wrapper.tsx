import SchedulePreview from '@/components/admin/container/student/shedule-preview'
import { getStudentCourseSchedules } from '@/constants/data/student'

export default async function SchedulesWrapper() {
   const schedules = await getStudentCourseSchedules()
   return (
      <div>
         <SchedulePreview data={schedules} />
      </div>
   )
}
