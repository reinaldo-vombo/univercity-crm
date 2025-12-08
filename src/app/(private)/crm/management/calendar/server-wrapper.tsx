import EventCalendar from '@/components/templates/event-calendar'
import { getAllCalendarEvents } from '@/services/data/calendar'

export default async function ServerWrapper() {

   const data = await getAllCalendarEvents()
   return <EventCalendar subscriptions={data} />
}
