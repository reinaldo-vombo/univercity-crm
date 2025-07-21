import Card from "@/components/shared/card";
import EventCalendar from "@/components/shared/event-calendar";


export default function EventsPage() {
   return (
      <section className="col-span-12">
         <Card lable="Eventos">
            <h1 className="text-2xl font-bold">Eventos</h1>
            <EventCalendar />
         </Card>
      </section>
   )
}
