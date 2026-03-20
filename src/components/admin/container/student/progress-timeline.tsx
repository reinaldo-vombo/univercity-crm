
import { TSemesterHistory } from "@/types/global";
import HistoryItem from "./history-item";

export function StudentProgressTimeline({ history }: { history: TSemesterHistory[] }) {
   if (!history.length) {
      return (
         <p className="text-center text-sm text-muted-foreground py-10">
            Nenhum historial académico encontrado.
         </p>
      )
   }

   return (
      <div className="relative">
         {history.map((summary, i) => (
            <HistoryItem
               key={summary.id}
               summary={summary}
               isLast={i === history.length - 1}
            />
         ))}
      </div>
   )
}