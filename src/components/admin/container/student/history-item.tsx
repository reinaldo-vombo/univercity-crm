import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, TrendingUp, XCircle } from "lucide-react";
import DisciplineGrid from "./discipline-grid";
import { TSemesterHistory } from "@/types/global";

type TProps = {
   summary: TSemesterHistory;
   isLast: boolean;
}
const statusConfig = {
   PROMOTED: {
      label: "Transitou",
      variant: "success" as const,
      icon: CheckCircle2,
      color: "text-green-600",
      dot: "bg-green-500",
   },
   RETAINED: {
      label: "Retido",
      variant: "destructive" as const,
      icon: XCircle,
      color: "text-destructive",
      dot: "bg-destructive",
   },
   CONDITIONAL: {
      label: "Condicional",
      variant: "warning" as const,
      icon: AlertCircle,
      color: "text-orange-500",
      dot: "bg-orange-500",
   },
   BLOCKED_FINANCIAL: {
      label: "Bloqueado — dívida",
      variant: "destructive" as const,
      icon: XCircle,
      color: "text-destructive",
      dot: "bg-destructive",
   },
   PENDING: {
      label: "Em curso",
      variant: "secondary" as const,
      icon: Clock,
      color: "text-muted-foreground",
      dot: "bg-muted-foreground",
   },
} satisfies Record<string, { label: string; variant: any; icon: any; color: string; dot: string }>
const HistoryItem = ({ summary, isLast }: TProps) => {
   const cfg = statusConfig[summary.status as keyof typeof statusConfig] ?? statusConfig.PENDING
   const Icon = cfg.icon;
   const sem = summary.academicSemester;
   const variante: any = cfg.variant;

   return (
      <div className="relative flex gap-4">
         {/* linha vertical — esconde no último item */}
         {!isLast && (
            <div className="absolute top-6 left-[11px] bottom-0 w-px bg-border" />
         )}

         {/* dot */}
         <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
            <div className={`h-3 w-3 rounded-full ${cfg.dot}`} />
         </div>

         {/* conteúdo */}
         <div className="min-w-0 flex-1 pb-8">

            {/* cabeçalho */}
            <div className="flex flex-wrap items-start justify-between gap-2">
               <div>
                  <p className="font-semibold leading-tight">
                     {sem.title} · {sem.year}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                     {summary.sectionTitle} · {summary.yearLevel.replace("_", " ")}
                  </p>
               </div>
               <Badge variant={variante} className="flex items-center gap-1">
                  <Icon className="h-3 w-3" />
                  {cfg.label}
               </Badge>
            </div>

            {/* métricas */}
            <Card className="mt-3 bg-muted/40">
               <CardContent className="p-3">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-4">
                     <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Aprovadas</span>
                        <span className="font-medium text-green-600">
                           {summary.approvedDisciplines}/{summary.totalDisciplines}
                        </span>
                     </div>
                     <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Reprovadas</span>
                        <span className="font-medium text-destructive">
                           {summary.failedDisciplines}
                        </span>
                     </div>
                     <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Média sem.</span>
                        <span className="font-medium text-blue-600">
                           {summary.semesterAverage?.toFixed(2) ?? "—"} v
                        </span>
                     </div>
                     <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Média acum.</span>
                        <span className="font-medium flex items-center gap-1">
                           <TrendingUp className="h-3 w-3 text-muted-foreground" />
                           {summary.cumulativeAverage?.toFixed(2) ?? "—"} v
                        </span>
                     </div>
                  </div>

                  {/* razão de retenção */}
                  {summary.statusReason && (
                     <p className="mt-2 text-xs text-muted-foreground border-t pt-2">
                        {summary.statusReason}
                     </p>
                  )}

                  {/* próxima turma */}
                  {summary.nextSectionTitle && summary.status === "PROMOTED" && (
                     <p className="mt-2 text-xs text-muted-foreground border-t pt-2">
                        Transita para {summary.nextSectionTitle}
                        {summary.promotedToYear && ` · ${summary.promotedToYear.replace("_", " ")}`}
                     </p>
                  )}
               </CardContent>
            </Card>

            {/* disciplinas */}
            <DisciplineGrid records={summary.disciplineRecords} />
         </div>
      </div>
   )
}
export default HistoryItem;