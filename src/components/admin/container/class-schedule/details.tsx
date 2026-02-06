import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TClassShedule } from "@/types/global";

type Props = {
   data: TClassShedule;
   onDelete: (sectionId: string, disciplineId: string) => Promise<void>;
};

const dayLabels: Record<string, string> = {
   SEGUNDA: "Segunda",
   TERCA: "Terça",
   QUARTA: "Quarta",
   QUINTA: "Quinta",
   SEXTA: "Sexta",
   SABADO: "Sábado",
   DOMINGO: "Domingo",
};

export const TimetableGrid = ({ data, onDelete }: Props) => {
   const daysOrder = [
      "SEGUNDA",
      "TERCA",
      "QUARTA",
      "QUINTA",
      "SEXTA",
      "SABADO",
      "DOMINGO",
   ] as const;

   return (
      <div className="space-y-6">
         <div>
            <h2 className="text-lg font-semibold">
               {data.title} — {data.shift.name} ({data.yearLevel})
            </h2>
            <p className="text-sm text-muted-foreground">
               Semestre: {data.semester.title}
            </p>
         </div>

         {daysOrder.map((day) => {
            const schedules = data.scheduleGrid[day] || [];

            return (
               <div key={day} className="space-y-2">
                  <h3 className="font-semibold">{dayLabels[day]}</h3>

                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Horário</TableHead>
                           <TableHead>Disciplina</TableHead>
                           <TableHead>Sala</TableHead>
                           <TableHead>Professor</TableHead>
                           <TableHead className="text-right">Ação</TableHead>
                        </TableRow>
                     </TableHeader>

                     <TableBody>
                        {schedules.length < 0 ? (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 Sem aula
                              </TableCell>
                           </TableRow>
                        ) : (
                           schedules.map((s) => (
                              <TableRow key={s.id}>
                                 <TableCell>
                                    {s.startTime} – {s.endTime}
                                 </TableCell>

                                 <TableCell>{s.discipline.name}</TableCell>

                                 <TableCell>{s.room}</TableCell>

                                 <TableCell>
                                    {s.faculty.firstName} {s.faculty.lastName}
                                 </TableCell>

                                 <TableCell className="text-right">
                                    <Button
                                       variant="destructive"
                                       size="sm"
                                       onClick={() =>
                                          onDelete(
                                             data.offeredCourseSectionId,
                                             s.disciplineId
                                          )
                                       }
                                    >
                                       Excluir
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))
                        )}
                     </TableBody>
                  </Table>
               </div>
            );
         })}
      </div>
   );
};
